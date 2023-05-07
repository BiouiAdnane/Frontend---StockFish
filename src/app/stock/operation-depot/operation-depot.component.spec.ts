import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDepotComponent } from './operation-depot.component';

describe('OperationDepotComponent', () => {
  let component: OperationDepotComponent;
  let fixture: ComponentFixture<OperationDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
