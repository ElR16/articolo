import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoloComponent } from './articolo.component';

describe('ArticoloComponent', () => {
  let component: ArticoloComponent;
  let fixture: ComponentFixture<ArticoloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticoloComponent]
    });
    fixture = TestBed.createComponent(ArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
