import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmballageEntreComponent } from './emballage-entre.component';

describe('EmballageEntreComponent', () => {
  let component: EmballageEntreComponent;
  let fixture: ComponentFixture<EmballageEntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmballageEntreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmballageEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
