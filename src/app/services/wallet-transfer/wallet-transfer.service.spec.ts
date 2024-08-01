import { TestBed } from '@angular/core/testing';

import { WalletTransferService } from './wallet-transfer.service';

describe('WalletTransferService', () => {
  let service: WalletTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
