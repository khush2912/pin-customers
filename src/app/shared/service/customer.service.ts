import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pin} from "../../modules/pins/pin";
import {Customers} from "../interface/customers";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) {
  }

  list(page?: number, limit: number = 10) {
    const params: any = {};
    if (page) {
      params['_page'] = page;
    }
    if (limit) {
      params['_limit'] = limit;
    }
    return this.http.get<Customers[]>(`${environment.restUrl}customers`, {
      params,
      observe: 'response'
    }).pipe(
      map(response => {
        return {data: response.body ?? [], totalCount: Number(response.headers.get('X-Total-Count'))}
      })
    );
    ;
  }

  get(id: number) {
    return this.http.get<Customers>(`${environment.restUrl}customers/${id}`);
  }

  create(customer: Customers) {
    delete customer.id;
    return this.http.post<Customers>(`${environment.restUrl}customers`, customer);
  }

  update(customer: Customers) {
    return this.http.put<Customers>(`${environment.restUrl}customers/${customer.id}`, customer);
  }
}
