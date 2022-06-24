import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public cartList: any[] = [];
  public amount = 0;
  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartList = cart;
      this.amount = this.cartList.map(cart => cart.amount).reduce((previous, current) => previous + current, 0);      
    })
    
  }

}
