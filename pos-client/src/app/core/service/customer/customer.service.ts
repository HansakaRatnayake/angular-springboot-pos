import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {Observable, Subject} from "rxjs";
import {CustomerDTO} from "../../dto/CustomerDTO";
import {StandardResponseDTO} from "../../dto/StandardResponseDTO";
import {PaginatedDTO} from "../../dto/PaginatedDTO";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string = `${environment.url}/customers`;

  isCreated : Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  search(searchText:string, page:number, size:number): Observable<StandardResponseDTO<PaginatedDTO<CustomerDTO>>> {
    let params = new HttpParams();
    params = params.append('searchText', searchText);
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<StandardResponseDTO<PaginatedDTO<CustomerDTO>>>(`${this.baseUrl}`, {params: params});
  }

  findById(customerId:string): Observable<StandardResponseDTO<CustomerDTO>> {
    return this.http.get<StandardResponseDTO<CustomerDTO>>(`${this.baseUrl}/${customerId}`);
  }

  create(customerDTO: Omit<CustomerDTO, 'customerId'>): Observable<StandardResponseDTO<CustomerDTO>> {
    return this.http.post<StandardResponseDTO<CustomerDTO>>(`${this.baseUrl}`, customerDTO);
  }

  update(customerDTO:Omit<CustomerDTO, 'customerId'>, customerId : string): Observable<StandardResponseDTO<CustomerDTO>> {
    return this.http.put<StandardResponseDTO<CustomerDTO>>(`${this.baseUrl}/${customerId}`, customerDTO);
  }

  delete(customerId:string): Observable<StandardResponseDTO<any>> {
    return this.http.delete<StandardResponseDTO<any>>(`${this.baseUrl}/${customerId}`);
  }

}
