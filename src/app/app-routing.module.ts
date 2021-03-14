import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'details', loadChildren: './pages/password-details/password-details.module#PasswordDetailsPageModule' },
  { path: 'details/:id', loadChildren: './pages/password-details/password-details.module#PasswordDetailsPageModule' },
  { path: 'password-list', loadChildren: './pages/password-list/password-list.module#PasswordListPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
