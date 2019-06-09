import { TestBed } from '@angular/core/testing';

import { PetPostService } from './pet-post.service';

describe('PetPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetPostService = TestBed.get(PetPostService);
    expect(service).toBeTruthy();
  });
});
