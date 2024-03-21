import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router : Router) {}

  ngOnInit()  { 
    this.items = [
    {
      label: 'articolo',
      icon: 'pi pi-fw pi-file',
      items: [
          {
              label: 'Nuovo',
              icon: 'pi pi-fw pi-plus',command:() => {this.navigateTo('/articolo'); }
          },
          {
              separator: true
          }
      ]
  } ]
}
navigateTo(path: string) {
  this.router.navigate([path]);
}
}