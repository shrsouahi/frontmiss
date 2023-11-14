import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleinfosComponent } from './articleinfos.component';

describe('ArticleinfosComponent', () => {
  let component: ArticleinfosComponent;
  let fixture: ComponentFixture<ArticleinfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleinfosComponent]
    });
    fixture = TestBed.createComponent(ArticleinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
