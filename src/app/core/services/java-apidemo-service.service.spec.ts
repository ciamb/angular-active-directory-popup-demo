import { TestBed } from '@angular/core/testing';

import { JavaAPIDemoServiceService } from './java-apidemo-service.service';

describe('JavaAPIDemoServiceService', () => {
  let service: JavaAPIDemoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavaAPIDemoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
