import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNatureComponent } from './update-nature.component';

describe('UpdateNatureComponent', () => {
  let component: UpdateNatureComponent;
  let fixture: ComponentFixture<UpdateNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
