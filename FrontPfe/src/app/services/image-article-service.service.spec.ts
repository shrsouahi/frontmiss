import { TestBed } from '@angular/core/testing';

import { ImageArticleServiceService } from './image-article-service.service';

describe('ImageArticleServiceService', () => {
  let service: ImageArticleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageArticleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
