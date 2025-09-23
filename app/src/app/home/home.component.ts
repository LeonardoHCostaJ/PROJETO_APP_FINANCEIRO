import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
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
</section>
  `,
})
export class HomeComponent {}
