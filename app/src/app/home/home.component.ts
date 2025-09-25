import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LancamentosService, Lancamento, IdNome } from '../lancamentos/lancamentos.service';

import Chart from 'chart.js/auto';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
<section class="container py-5">
  <h1 class="h3 mb-4">Bem-vindo 👋</h1>

  <div class="row g-3">
    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Lançamentos</h2>
          <p class="text-muted mb-4">Crie, edite e gerencie seus lançamentos.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/lancamentos">Abrir</a>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Contas</h2>
          <p class="text-muted mb-4">Gerencie suas contas bancárias.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/contas">Abrir</a>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Terceiros</h2>
          <p class="text-muted mb-4">Fornecedores e clientes.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/terceiros">Abrir</a>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Usuários</h2>
          <p class="text-muted mb-4">Gestão de usuários do sistema.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/usuarios">Abrir</a>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Centros de Custo</h2>
          <p class="text-muted mb-4">Classifique seus lançamentos.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/centroCustos">Abrir</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Bancos</h2>
          <p class="text-muted mb-4">Gestão dos Bancos.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/bancos">Abrir</a>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 col-xl-3">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="h5">Metas Financeiras</h2>
          <p class="text-muted mb-4">Gestão das Metas Financeiras.</p>
          <a class="btn btn-outline-primary mt-auto" routerLink="/metaFinanceiras">Abrir</a>
        </div>
      </div>
    </div>
  </div>

  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <div class="row g-3 align-items-end">
        <div class="col-12 col-md-4">
          <label class="form-label mb-1">Conta</label>
          <select class="form-select"
                  [ngModel]="contaId"
                  (ngModelChange)="contaId = $event; aplicar()">
            <option *ngFor="let c of contas" [ngValue]="c.id">
              {{ c.descricao || c.nome || ('#' + c.id) }}
            </option>
          </select>
        </div>

        <div class="col-6 col-md-3">
          <label class="form-label mb-1">Período — de</label>
          <input type="date" class="form-control" [(ngModel)]="de">
        </div>
        <div class="col-6 col-md-3">
          <label class="form-label mb-1">Período — até</label>
          <input type="date" class="form-control" [(ngModel)]="ate">
        </div>

        <div class="col-12 col-md-5">
          <label class="form-label mb-1 d-block">Base de valor</label>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="base" id="doc"
         [checked]="!usarBaixa" (change)="usarBaixa=false; aplicar()">
  <label for="doc" class="form-check-label">Documento</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="base" id="baix"
         [checked]="usarBaixa" (change)="usarBaixa=true; aplicar()">
  <label for="baix" class="form-check-label">Baixa</label>
</div>
        </div>

        <div class="col-12 col-md-3 d-flex gap-2 justify-content-end">
          <button class="btn btn-outline-secondary" (click)="limpar()">Limpar</button>
          <button class="btn btn-primary" (click)="aplicar()">Aplicar</button>
        </div>

        <div class="col-12" *ngIf="erro">
          <div class="alert alert-danger mt-2 mb-0">{{ erro }}</div>
        </div>
      </div>

      <div class="mt-3">
        <canvas #gastosCentroChart height="200"></canvas>
        <div *ngIf="msgSemDados" class="text-muted small mt-2">{{ msgSemDados }}</div>
      </div>
    </div>
  </div>
</section>
  `,
})
export class HomeComponent {
  constructor(private api: LancamentosService) {}

  @ViewChild('gastosCentroChart') gastosCentroChart!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  lancs: Lancamento[] = [];
  contas: IdNome[] = [];

  contaId: number | null = null;
  de = '';  // yyyy-MM-dd
  ate = '';
  usarBaixa = false;

  erro: string | null = null;
  msgSemDados = '';

  ngOnInit() {
    this.api.listar().subscribe({
      next: (ls) => { this.lancs = ls ?? []; this.drawIfReady(); },
      error: () => { this.erro = 'Falha ao carregar lançamentos'; }
    });
    this.api.listarContas().subscribe({
      next: (v) => { 
        this.contas = v ?? []; 
        if (!this.contaId && this.contas.length) this.contaId = this.contas[0].id;
        this.drawIfReady();
      }
    });
  }

  ngAfterViewInit() { this.drawIfReady(); }

  aplicar() { this.redesenhar(); }
  limpar() { this.de = ''; this.ate = ''; this.usarBaixa = false; this.redesenhar(); }

  private drawIfReady() {
    // espera ter canvas + algum dado (lancs e contas carregados)
    if (!this.gastosCentroChart) return;
    if (!this.lancs.length || !this.contas.length) return;
    // aguarda um frame para garantir canvas montado
    requestAnimationFrame(() => this.redesenhar());
  }

 private refDateISO(l: Lancamento): string | null {
  const iso = this.usarBaixa ? l.dataBaixaISO : l.dataLancamentoISO;
  return iso ? iso.slice(0, 10) : null; // normaliza p/ yyyy-MM-dd
}

private inRangeISO(dateISO: string | null): boolean {
  if (!dateISO) return false;
  if (this.de && dateISO < this.de) return false;
  if (this.ate && dateISO > this.ate) return false;
  return true;
}

private valorDebito(l: Lancamento): number {
  const tipo = String(l.tipoLancamento ?? '').toLowerCase();
  // tolerante a variações: Debito / DEBITO / debit…
  if (tipo !== 'debito' && !tipo.startsWith('debit')) return 0;
  const v = this.usarBaixa ? (l.valorBaixado ?? 0) : (l.valorDocumento ?? 0);
  return Number(v) || 0;
}

private groupByCentroForConta(): Map<string, number> {
  const map = new Map<string, number>();
  const cid = this.contaId;

  for (const l of this.lancs) {
    if (cid && (l.conta?.id ?? null) !== cid) continue;

    const refDate = this.refDateISO(l);
    if (!this.inRangeISO(refDate)) continue;

    const v = this.valorDebito(l);
    if (!v) continue;

    const label = l.centroCusto?.descricao
      || (l.centroCusto?.id != null ? `#${l.centroCusto.id}` : '— Sem centro —');

    map.set(label, (map.get(label) ?? 0) + v);
  }
  return map;
}

private redesenhar() {
  if (!this.gastosCentroChart) return;

  this.chart?.destroy();
  this.msgSemDados = '';

  const dataMap = this.groupByCentroForConta();
  const labels = [...dataMap.keys()];
  const data = [...dataMap.values()];

  if (!labels.length) {
    this.msgSemDados = 'Sem dados no período/conta selecionados.';
    return;
  }

  // se tudo for zero, o Chart não desenha nada → avise
  const total = data.reduce((s, n) => s + Math.abs(n || 0), 0);
  if (total <= 0) {
    this.msgSemDados = 'Sem valores > 0 no período/conta selecionados.';
    return;
  }

  this.chart = new Chart(this.gastosCentroChart.nativeElement.getContext('2d')!, {
    type: 'doughnut',
    data: { labels, datasets: [{ data }] },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${Number(ctx.parsed)
              .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          }
        }
      }
    }
  });
}
  ngOnDestroy() { this.chart?.destroy(); }
}
