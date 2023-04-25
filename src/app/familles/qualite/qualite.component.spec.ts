import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteComponent } from './qualite.component';

describe('QualiteComponent', () => {
  let component: QualiteComponent;
  let fixture: ComponentFixture<QualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
