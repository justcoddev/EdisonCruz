import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  FormProduct: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productservice: ProductsService,
    private router: Router
  ) {
    this.FormProduct = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      logo: [''],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  addProduct() {
    this.productservice
      .saveProducts(this.FormProduct.value)
      .subscribe((data) => {
        console.log(data);
      });

    //NOTE - despues de guardar navegar a la lista de productos
    this.closeProduct();
  }

  closeProduct() {
    this.router.navigate(['/productos']);
  }

  cleanForm() {
    this.FormProduct.reset();
  }
}
