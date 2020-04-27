import { TestBed } from '@angular/core/testing';

import { AllTimesheetsService } from './all-timesheets.service';

describe('AllTimesheetsService', () => {
  let service: AllTimesheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTimesheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
