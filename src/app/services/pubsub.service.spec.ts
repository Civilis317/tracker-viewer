import { TestBed, inject } from '@angular/core/testing';

import { PubsubService } from './pubsub.service';

describe('PubsubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PubsubService]
    });
  });

  it('should be created', inject([PubsubService], (service: PubsubService) => {
    expect(service).toBeTruthy();
  }));
});
