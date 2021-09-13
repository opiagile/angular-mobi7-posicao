import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoInteresseComponent } from './ponto-interesse.component';

describe('PontoInteresseComponent', () => {
  let component: PontoInteresseComponent;
  let fixture: ComponentFixture<PontoInteresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PontoInteresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
