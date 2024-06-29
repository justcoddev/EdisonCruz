import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.css'],
})
export class TableProductComponent implements OnInit {
  //Declarar
  // products: Product[] = [];
  listProducts: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProductList();
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

  newProduct() {
    this.router.navigate(['/nuevo-producto']);
  }
}
