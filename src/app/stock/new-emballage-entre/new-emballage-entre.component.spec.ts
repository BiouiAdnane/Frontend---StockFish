import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmballageEntreComponent } from './new-emballage-entre.component';

describe('NewEmballageEntreComponent', () => {
  let component: NewEmballageEntreComponent;
  let fixture: ComponentFixture<NewEmballageEntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEmballageEntreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmballageEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
