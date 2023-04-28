import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmballageSortieComponent } from './emballage-sortie.component';

describe('EmballageSortieComponent', () => {
  let component: EmballageSortieComponent;
  let fixture: ComponentFixture<EmballageSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmballageSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmballageSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
