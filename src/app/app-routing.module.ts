import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ArticoloComponent } from './core/articolo/articolo.component';


const routes: Routes = [
  {path: '' , component: LayoutComponent},
  {path: 'articolo',component: ArticoloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
