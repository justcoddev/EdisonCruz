import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  addProducts(value: any) {
    throw new Error('Method not implemented.');
  }
  private readonly URL = environment.api;

  private productURL = `${this.URL}/bp/products`;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.http.get(`${this.productURL}`);
  }

  public saveProducts(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productURL}`, product);
  }

  //Update
  // public updateProducts(id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.productURL}/${id}`, data);
  // }

  // Update
  public updateProducts(id: string, data: any): Observable<any> {
    return this.http.put(`${this.productURL}/${id}`, data);
  }

  // public deleteProducts(id: number): Observable<any> {
  //   return this.http.delete(`${this.productURL}/${id}`);
  // }
  public deleteProducts(id: string): Observable<any> {
    return this.http.delete(`${this.productURL}/${id}`);
  }

  //verificacion de id
  public verficarId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.productURL}/verification/${id}`);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productURL}/${id}`);
  }
}
