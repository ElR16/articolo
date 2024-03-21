import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticoloComponent } from './articolo/articolo.component';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {MatButtonModule} from '@angular/material/button'; 

@NgModule({
  declarations: [
    ArticoloComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    MatButtonModule
  ]
})
export class CoreModule { }
