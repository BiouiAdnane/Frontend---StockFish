import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarqueComponent } from './update-marque.component';

describe('UpdateMarqueComponent', () => {
  let component: UpdateMarqueComponent;
  let fixture: ComponentFixture<UpdateMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
