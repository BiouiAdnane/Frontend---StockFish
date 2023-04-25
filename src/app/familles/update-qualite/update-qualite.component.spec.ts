import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQualiteComponent } from './update-qualite.component';

describe('UpdateQualiteComponent', () => {
  let component: UpdateQualiteComponent;
  let fixture: ComponentFixture<UpdateQualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
