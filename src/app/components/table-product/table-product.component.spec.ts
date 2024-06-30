import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableProductComponent } from './table-product.component';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';

const productListMock = [
  {
    id: 'dos',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'Producto',
    descripcion: 'Descripcion producto',
    fecha_liberacion: '2024-06-29',
    fecha_revision: '2025-06-29',
  },
  {
    id: 'tres',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-01',
    fecha_revision: '2025-06-01',
  },
  {
    id: 'cinco',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-08',
    fecha_revision: '2025-06-08',
  },
  {
    id: 'seis',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-15',
    fecha_revision: '2025-06-15',
  },
  {
    id: 'siete',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-27',
    fecha_revision: '2025-06-27',
  },
  {
    id: 'ocho',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-28',
    fecha_revision: '2025-06-28',
  },
  {
    id: 'nueve',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'name productoss',
    descripcion: 'ssssssssss',
    fecha_liberacion: '2024-06-30',
    fecha_revision: '2025-06-30',
  },
];

const productServiceMock = {
  getProducts: jest.fn().mockReturnValue(of({ data: productListMock })),
  delete: jest.fn(),
};

describe('TableProductComponent', () => {
  let component: TableProductComponent;
  let fixture: ComponentFixture<TableProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TableProductComponent],
      providers: [{ provide: ProductsService, useValue: productServiceMock }],
    });
    fixture = TestBed.createComponent(TableProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //TODO - separacion
  it('should create', () => {
    // const app = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  it('should toggle dropdown correctly', () => {
    // Arrange
    const productId = 'dos';

    component.toggleDropdown(productId);
    const isOpenAfterToggle = component.isDropdownOpen(productId);
    expect(isOpenAfterToggle).toBe(true);
    component.toggleDropdown(productId);
    const isOpenAfterSecondToggle = component.isDropdownOpen(productId);

    expect(isOpenAfterSecondToggle).toBe(false);
  });

  it('should update registrosPorPaginaSeleccionados correctly', () => {
    const newValue = '10';

    component.onChangeRegistrosPorPagina(newValue);
    expect(component.registrosPorPaginaSeleccionados).toBeTruthy();
  });

  it('should filter products by name correctly', () => {
    const mockProducts: Product[] = [
      {
        id: 'uno',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Producto',
        description: 'Descripcion producto',
        date_release: new Date('2024-06-29'),
        date_revision: new Date('2025-06-29'),
      },
      {
        id: 'dos',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Producto',
        description: 'Descripcion producto',
        date_release: new Date('2024-06-29'),
        date_revision: new Date('2025-06-29'),
      },
      {
        id: 'tres',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        name: 'Productos',
        description: 'Descripcion producto',
        date_release: new Date('2024-06-29'),
        date_revision: new Date('2025-06-29'),
      },
    ];

    component.listProducts = mockProducts;

    component.busqueda = 'Product';
    component.buscarFiltro();

    const filteredNames = component.copiaFiltrarListProducts.map((p) => p.name);

    expect(filteredNames.includes('Producto')).toBeTruthy();
    expect(filteredNames.includes('Productos')).toBeTruthy();
  });

  it('should update number of records per page correctly', () => {
    const selectedValue = '10';
    component.onChangeRegistrosPorPagina(selectedValue);

    expect(component.registrosPorPaginaSeleccionados).toBeDefined();
    expect(component.registrosPorPaginaSeleccionados).not.toBeNull();
  });

  it('should set productToDelete correctly on confirmDelete', () => {
    // Arrange
    const mockProduct: Product = {
      id: '1',
      name: 'Product 1',
      description: 'Description of Product 1',
      logo: 'https://example.com/logo1.png',
      date_release: new Date('2024-06-30'),
      date_revision: new Date('2025-06-30'),
    };

    // Act
    component.confirmDelete(mockProduct);

    // Assert
    expect(component.productToDelete).toEqual(mockProduct);
  });

  // it('true', () => {
  //   expect(true).toBeTruthy();
  // });
});
