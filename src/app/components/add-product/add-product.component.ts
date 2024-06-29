import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  FormProduct: FormGroup;
  idExiste = false;

  isEditMode = false;
  productId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productservice: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.FormProduct = this.formBuilder.group({
      id: [
        { value: '', disabled: this.isEditMode },
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

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.loadProductData(this.productId);
      }
    });
  }

  addProduct() {
    if (this.FormProduct.valid) {
      const formData = this.FormProduct.getRawValue();
      if (this.isEditMode && this.productId) {
        this.productservice
          .updateProducts(this.productId, formData)
          .subscribe(() => {
            this.router.navigate(['/productos']);
          });
      } else {
        this.productservice.verficarId(formData.id).subscribe((existe) => {
          if (existe) {
            this.idExiste = existe;
          } else {
            this.productservice.saveProducts(formData).subscribe(() => {
              this.router.navigate(['/productos']);
            });
          }
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  closeProduct() {
    this.router.navigate(['/productos']);
  }

  cleanForm() {
    this.FormProduct.reset();
  }

  loadProductData(id: string) {
    this.productservice.getProductById(id).subscribe((product) => {
      this.FormProduct.patchValue(product);
      this.FormProduct.get('id')?.disable(); // Deshabilitar el campo ID
    });
  }
}
