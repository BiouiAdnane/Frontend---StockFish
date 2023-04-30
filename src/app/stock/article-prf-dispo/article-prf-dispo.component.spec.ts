import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePrfDispoComponent } from './article-prf-dispo.component';

describe('ArticlePrfDispoComponent', () => {
  let component: ArticlePrfDispoComponent;
  let fixture: ComponentFixture<ArticlePrfDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlePrfDispoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlePrfDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
