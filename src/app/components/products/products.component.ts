import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any[] = [];
  public cartList: any[] = [];
  constructor(private readonly productsService: ProductsService, private readonly cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.productsService.getProducts();
  }

  public addToCart(product: any) {
    const existProduct = this.cartList.findIndex(el => el.id === product.id);
    if (existProduct >= 0) {
      this.cartList[existProduct] = {
        ...product,
        amount: this.cartList[existProduct].amount + 1
      }
    } else {
      this.cartList.push({...product, amount: 1});
    }
    this.cartService.updateCart(this.cartList);
  }

}
