import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent {
  //Declarar
  // products: Product[] = [];
  listProducts: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    console.log('data: ', this.getProductList());
  }

  getProductList() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('🆗🆗', res);
        this.listProducts = res.data;
      },
      error: console.log,
    });
  }
}
