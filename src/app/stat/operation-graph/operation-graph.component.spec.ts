import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationGraphComponent } from './operation-graph.component';

describe('OperationGraphComponent', () => {
  let component: OperationGraphComponent;
  let fixture: ComponentFixture<OperationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
