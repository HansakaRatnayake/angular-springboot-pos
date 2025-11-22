import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StandardResponseDTO} from "../../dto/StandardResponseDTO";
import {PaginatedDTO} from "../../dto/PaginatedDTO";
import {ProductDTO} from "../../dto/ProductDTO";
import {OrderDTO} from "../../dto/OrderDTO";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = `${environment.url}/orders`;

  isCreated : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  search(searchText:string, page:number, size:number): Observable<StandardResponseDTO<PaginatedDTO<OrderDTO>>> {
    let params = new HttpParams();
    params = params.append('searchText', searchText);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<StandardResponseDTO<PaginatedDTO<OrderDTO>>>(`${this.baseUrl}`, {params: params});
  }

  findById(orderId:string): Observable<StandardResponseDTO<OrderDTO>> {
    return this.http.get<StandardResponseDTO<OrderDTO>>(`${this.baseUrl}/${orderId}`);
  }

  create(orderDTO: Omit<OrderDTO, 'orderId'|'date'>): Observable<StandardResponseDTO<OrderDTO>> {
    return this.http.post<StandardResponseDTO<OrderDTO>>(`${this.baseUrl}`, orderDTO);
  }

  delete(orderId:string): Observable<StandardResponseDTO<any>> {
    return this.http.delete<StandardResponseDTO<any>>(`${this.baseUrl}/${orderId}`);
  }

  findTotalSales(): Observable<StandardResponseDTO<number>> {
    return this.http.get<StandardResponseDTO<number>>(`${this.baseUrl}/totalsales`);
  }

  findTop5Orders(): Observable<StandardResponseDTO<OrderDTO[]>> {
    return this.http.get<StandardResponseDTO<OrderDTO[]>>(`${this.baseUrl}/top5Orders`);
  }

  findMonthlySales(): Observable<StandardResponseDTO<any>> {
    return this.http.get<StandardResponseDTO<any>>(`${this.baseUrl}/monthlySales`);
  }
}
