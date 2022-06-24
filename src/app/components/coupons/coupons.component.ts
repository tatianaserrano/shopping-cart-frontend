import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  public coupons: any[] = [];
  constructor(private readonly couponsService: CouponsService) { }

  async ngOnInit(): Promise<void> {
    this.coupons = await this.couponsService.getCoupons();
  }

}
