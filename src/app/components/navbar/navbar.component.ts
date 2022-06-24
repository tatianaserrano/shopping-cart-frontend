import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CouponsService } from '../../services/coupons.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cartList: any[] = [];
  public amount = 0;
  public total = 0;
  public totalDiscount = 0;
  public coupon: any = null;
  public couponForm = new FormGroup({
    coupon: new FormControl()
  })
  constructor(private readonly cartService: CartService,
    private readonly couponsService: CouponsService,
    private readonly productsService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartList = cart;
      this.amount = this.cartList.map(cart => cart.amount).reduce((previous, current) => previous + current, 0);
      this.total = this.cartList.map(item => item.price * item.amount).reduce((previous, current) => previous + current, 0);
    })

  }

  public async applyCoupon() {
    const couponsList = await this.couponsService.getCoupons();
    this.coupon = couponsList.find((coupon: any) => coupon.code === this.couponForm.value.coupon);
    this.totalDiscount = this.total * this.coupon.percentage / 100;
    this.total = this.total - this.totalDiscount
  }

  public async addPurchase() {
    const body = {
      idCoupon: this.coupon.id,
      totalPurchase: this.total,
      totalDiscount: this.totalDiscount,
      productsList: this.cartList.map(product => {
        return {
          id: product.id,
          amount: product.amount
        }
      })
    }
    await this.productsService.addPurchase(body);    
    window.location.assign('/congrats')
    // this.router.navigateByUrl('/congrats');
  }

}
