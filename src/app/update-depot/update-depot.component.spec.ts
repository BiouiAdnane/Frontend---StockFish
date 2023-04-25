import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDepotComponent } from './update-depot.component';

describe('UpdateDepotComponent', () => {
  let component: UpdateDepotComponent;
  let fixture: ComponentFixture<UpdateDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
