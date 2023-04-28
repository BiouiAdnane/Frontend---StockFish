import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdFinEntreComponent } from './prd-fin-entre.component';

describe('PrdFinEntreComponent', () => {
  let component: PrdFinEntreComponent;
  let fixture: ComponentFixture<PrdFinEntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdFinEntreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdFinEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
