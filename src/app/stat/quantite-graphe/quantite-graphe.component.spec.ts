import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantiteGrapheComponent } from './quantite-graphe.component';

describe('QuantiteGrapheComponent', () => {
  let component: QuantiteGrapheComponent;
  let fixture: ComponentFixture<QuantiteGrapheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantiteGrapheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantiteGrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
