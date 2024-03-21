import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MenubarModule } from 'primeng/menubar';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LayoutComponent,
    MenubarComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    CoreModule
  ]
})
export class LayoutModule { }
