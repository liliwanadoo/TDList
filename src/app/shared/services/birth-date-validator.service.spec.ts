import { TestBed } from '@angular/core/testing';

import { Injectable } from '@angular/core';
import { BirthDateValidatorService } from './birth-date-validator.service';


describe('BirthDateValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BirthDateValidatorService = TestBed.get(BirthDateValidatorService);
    expect(service).toBeTruthy();
  });
});
