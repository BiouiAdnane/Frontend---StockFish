import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdFinSortieComponent } from './prd-fin-sortie.component';

describe('PrdFinSortieComponent', () => {
  let component: PrdFinSortieComponent;
  let fixture: ComponentFixture<PrdFinSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdFinSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdFinSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
