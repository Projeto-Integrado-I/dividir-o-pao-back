import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'signup',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignUpModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'update-profile',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/update-profile/update-profile.module').then(
        (m) => m.UpdateProfileModule
      ),
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },
  {
    path: 'solicitacoes',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/solicitacoes/solicitacoes.module').then(
        (m) => m.SolicitacoesModule
      ),
  },
  {
    path: 'contatos',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/contatos/contatos.module').then((m) => m.ContatosModule),
  },
  {
    path: 'recursos',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/recursos/recursos.module').then((m) => m.RecursosModule),
  },
  {
    path: 'historico-solicitacao',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/historico-solicitacao/historico-solicitacao.module').then(
        (m) => m.HistoricoSolicitacaoModule
      ),
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
