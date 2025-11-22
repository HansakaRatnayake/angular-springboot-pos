import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {StandardResponseDTO} from "../../dto/StandardResponseDTO";
import {PaginatedDTO} from "../../dto/PaginatedDTO";
import {OrderDTO} from "../../dto/OrderDTO";
import {TopProductDTO,} from "../../dto/TopProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl: string = `${environment.url}/items`;

  constructor(private http: HttpClient) { }

  findTopProductItems():Observable<StandardResponseDTO<TopProductDTO[]>>{
    return this.http.get<StandardResponseDTO<TopProductDTO[]>>(`${this.baseUrl}/top`)
  }
}
