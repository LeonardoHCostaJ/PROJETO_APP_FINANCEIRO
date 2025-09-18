import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // página de bancos
  {
    path: 'bancos',
    loadComponent: () =>
      import('./bancos/bancos.component').then(m => m.BancosComponent),
  },

    {
    path: 'terceiros',
    loadComponent: () =>
      import('./terceiros/terceiros.component').then(m => m.TerceirosComponent),
  },
    {
    path: 'centroCustos',
    loadComponent: () =>
      import('./centroCustos/centroCustos.component').then(m => m.CentroCustosComponent),
  },
      {
    path: 'metaFinanceiras',
    loadComponent: () =>
      import('./metaFinanceiras/metaFinanceiras.component').then(m => m.MetaFinanceirasComponent),
  },
  {
      path: 'contas',
    loadComponent: () =>
      import('./contas/contas.component').then(m => m.ContasComponent),
  },
  {
        path: 'usuarios',
    loadComponent: () =>
      import('./usuarios/usuarios.component').then(m => m.UsuariosComponent),
  },

  // login
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then(m => m.LoginComponent),
  },

  // fallback
  { path: '**', redirectTo: 'login' },
];