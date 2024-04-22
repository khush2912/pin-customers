import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pin} from "../../modules/pins/pin";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PinService {

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
    return this.http.get<Pin[]>(`${environment.restUrl}pins`, {
      params,
      observe: 'response'
    }).pipe(
      map(response => {
        return {data: response.body ?? [], totalCount: Number(response.headers.get('X-Total-Count'))}
      })
    );
  }

  create(pin: Pin) {
    delete pin.id;
    return this.http.post<Pin>(`${environment.restUrl}pins`, pin);
  }

  update(pin: Pin) {
    return this.http.put<Pin>(`${environment.restUrl}pins/${pin.id}`, pin);
  }
}
