import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" routerLink="/home">Financeiro</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto" *ngIf="auth.isLoggedIn()">
          <li class="nav-item"><a class="nav-link" routerLink="/home" routerLinkActive="active">Home</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/bancos" routerLinkActive="active">Bancos</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/contas" routerLinkActive="active">Contas</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/terceiros" routerLinkActive="active">Terceiros</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/usuarios" routerLinkActive="active">Usuários</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/centroCustos" routerLinkActive="active">Centros de Custo</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/metaFinanceiras" routerLinkActive="active">Metas Financeiras</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/lancamentos" routerLinkActive="active">Lançamentos</a></li>
        </ul>

<div class="d-flex">
  <button *ngIf="auth.isLoggedIn()" class="btn btn-outline-light btn-sm" (click)="auth.logout()">Sair</button>
  <a *ngIf="!auth.isLoggedIn()" class="btn btn-outline-light btn-sm" routerLink="/login">Login</a>
</div>
      </div>
    </div>
  </nav>

  <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  auth = inject(AuthService);
}
