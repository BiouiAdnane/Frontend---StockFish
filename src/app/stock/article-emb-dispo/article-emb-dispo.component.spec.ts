import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEmbDispoComponent } from './article-emb-dispo.component';

describe('ArticleEmbDispoComponent', () => {
  let component: ArticleEmbDispoComponent;
  let fixture: ComponentFixture<ArticleEmbDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleEmbDispoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleEmbDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
