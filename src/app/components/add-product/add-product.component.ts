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
  idExiste = false;
  constructor(
    private formBuilder: FormBuilder,
    private productservice: ProductsService,
    private router: Router
  ) {
    this.FormProduct = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      logo: [
        '',
        [
          Validators.required,
          Validators.pattern('https?://.+'), //NOTE - validacion de url xq da error sisolo ingresatexto
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      date_release: ['', [Validators.required]],
      // date_revision: ['', [Validators.required]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
      // date_revision: {
      //   value: '',
      //   disabled: true,

      // },
      //NOTE - faltafecha validaciones
    });
  }

  ngOnInit(): void {
    const dateReleaseControl = this.FormProduct.get('date_release');
    if (dateReleaseControl) {
      dateReleaseControl.valueChanges.subscribe((value) => {
        console.log(value);
        const date = new Date(value);
        date.setFullYear(date.getFullYear() + 1);
        const dateRevisionControl = this.FormProduct.get('date_revision');
        if (dateRevisionControl) {
          dateRevisionControl.setValue(date.toISOString().split('T')[0]);
        }
      });
    }
    //revisar  si es necesario
    const idControl = this.FormProduct.get('id');
    if (idControl) {
      idControl.valueChanges.subscribe(() => {
        this.idExiste = false;
      });
    }
  }

  addProduct() {
    //NOTE - guardar el producto
    if (this.FormProduct.valid) {
      const formData = this.FormProduct.getRawValue(); //revisar si es necesario
      // this.productservice.saveProducts(formData).subscribe((data) => {
      //   console.log(data);
      // });
      this.productservice.verficarId(formData.id).subscribe((existe) => {
        if (existe) {
          this.idExiste = existe;
          console.log('Id ya existe');
        } else {
          this.productservice.saveProducts(formData).subscribe((data) => {
            console.log(data);
          });
          console.log('Formulario valido');
          //NOTE - despues de guardar navegar a la lista de productos
          this.closeProduct();
        }
      });
    } else {
      this.FormProduct.invalid;
      console.log('Formulario invalido');
    }
  }

  closeProduct() {
    this.router.navigate(['/productos']);
  }

  cleanForm() {
    this.FormProduct.reset();
  }
}
