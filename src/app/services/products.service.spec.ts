import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const productListMock = [
  [
    {
      id: 'dos',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: ' product',
      description: 'Descripcion producto',
      date_release: '2024-06-29',
      date_revision: '2025-06-29',
    },
    {
      id: 'tres',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-01',
      date_revision: '2025-06-01',
    },
    {
      id: 'cinco',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-08',
      date_revision: '2025-06-08',
    },
    {
      id: 'seis',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-15',
      date_revision: '2025-06-15',
    },
    {
      id: 'siete',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-27',
      date_revision: '2025-06-27',
    },
    {
      id: 'ocho',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-28',
      date_revision: '2025-06-28',
    },
    {
      id: 'nueve',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: 'Nombre productoss',
      description: 'ssssssssss',
      date_release: '2024-06-30',
      date_revision: '2025-06-30',
    },
  ],
];

//Reemplazar, mockear el servicio
const httpClientMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    service = TestBed.inject(ProductsService);
    httpClientMock.get.mockReturnValue(productListMock);
    // httpClientMock.get.mockReturnValue(of(productListMock));
  });

  //TODO - Prueba unitaria para el método getProducts
  it('getProduct return ProductList', () => {
    service.getProducts();
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  // it('getProduct return ProductList', (done) => {
  //   httpClientMock.get.mockReturnValue(of(productListMock));
  //   service.getProducts().subscribe((response) => {
  //     expect(response.length).toBe(5);
  //     done();
  //   });
  // });

  //TODO  - Prueba unitaria para el método postProducts
  it('postProd return ??', () => {
    service.saveProducts({
      id: 'dos',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: ' product',
      description: 'Descripcion producto',
      date_release: new Date('2024-06-29'),
      date_revision: new Date('2025-06-29'),
    });
    expect(httpClientMock.post).toHaveBeenCalled();
  });
  //TODO  - Prueba unitaria para el método putProducts
  it('updateProducts return update', () => {
    const id = 'producto_id';
    const data = {
      id: 'dos',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: ' product',
      description: 'Descripcion producto',
      date_release: '2024-06-29',
      date_revision: '2025-06-29',
    };

    service.updateProducts(id, data);

    expect(httpClientMock.put).toHaveBeenCalledWith(
      `${service['productURL']}/${id}`,
      data
    );
  });
  //TODO - Prueba unitaria para el método deleteProducts
  it('deleteProducts return delete', () => {
    const id = 'producto_id';

    service.deleteProducts(id);

    expect(httpClientMock.delete).toHaveBeenCalledWith(
      `${service['productURL']}/${id}`
    );
  });
  //TODO  - Prueba unitaria para el método verficarId
  it('verificarId return ???', () => {
    const id = 'producto_id';
    const mockResponse = true;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.verficarId(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  //TODO - Prueba unitaria para el método getProductById
  it(' getProduct por Id', () => {
    const productId = 'dos';
    const expectedProduct = {
      id: 'dos',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      name: ' product',
      description: 'Descripcion producto',
      date_release: new Date('2024-06-29'),
      date_revision: new Date('2025-06-29'),
    };

    httpClientMock.get.mockReturnValue(of(expectedProduct));

    service.getProductById(productId).subscribe((product) => {
      expect(product).toEqual(expectedProduct);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(
      `${service['productURL']}/${productId}`
    );
  });

  // it('true', () => {
  //   expect(true).toBeTruthy();
  // });
});
