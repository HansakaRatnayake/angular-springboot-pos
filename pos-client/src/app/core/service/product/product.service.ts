import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StandardResponseDTO} from "../../dto/StandardResponseDTO";
import {Observable, Subject} from "rxjs";
import {PaginatedDTO} from "../../dto/PaginatedDTO";
import {ProductDTO} from "../../dto/ProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = `${environment.url}/products`;

  isCreated : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  search(searchText:string, page:number, size:number): Observable<StandardResponseDTO<PaginatedDTO<ProductDTO>>> {
    let params = new HttpParams();
    params = params.append('searchText', searchText);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<StandardResponseDTO<PaginatedDTO<ProductDTO>>>(`${this.baseUrl}`, {params: params});
  }

  findById(productId:string): Observable<StandardResponseDTO<ProductDTO>> {
    return this.http.get<StandardResponseDTO<ProductDTO>>(`${this.baseUrl}/${productId}`);
  }

  create(productDTO: Omit<ProductDTO, 'id'>): Observable<StandardResponseDTO<ProductDTO>> {
    return this.http.post<StandardResponseDTO<ProductDTO>>(`${this.baseUrl}`, productDTO);
  }

  update(productDTO:Omit<ProductDTO, 'id'>, productId : string): Observable<StandardResponseDTO<ProductDTO>> {
    return this.http.put<StandardResponseDTO<ProductDTO>>(`${this.baseUrl}/${productId}`, productDTO);
  }

  delete(productId:string): Observable<StandardResponseDTO<any>> {
    return this.http.delete<StandardResponseDTO<any>>(`${this.baseUrl}/${productId}`);
  }
}
