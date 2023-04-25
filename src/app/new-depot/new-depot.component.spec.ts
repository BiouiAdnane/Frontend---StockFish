import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepotComponent } from './new-depot.component';

describe('NewDepotComponent', () => {
  let component: NewDepotComponent;
  let fixture: ComponentFixture<NewDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
