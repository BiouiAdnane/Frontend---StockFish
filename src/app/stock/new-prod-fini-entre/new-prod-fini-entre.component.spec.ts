import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProdFiniEntreComponent } from './new-prod-fini-entre.component';

describe('NewProdFiniEntreComponent', () => {
  let component: NewProdFiniEntreComponent;
  let fixture: ComponentFixture<NewProdFiniEntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProdFiniEntreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProdFiniEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
