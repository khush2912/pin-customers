import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pin} from "../../modules/pins/pin";
import {Customers, GeoData} from "../interface/customers";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryRegionService {
  regions: string[] = [];
  countries: GeoData[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  get() {
    return this.http.get<{ data: {[key: string]: GeoData} }>(`https://api.first.org/data/v1/countries`).pipe(
      map(data => {
        const countryRegionData = Object.values(data.data);
        this.regions = Array.from(new Set(countryRegionData.map(crd => crd.region)));
        this.countries = countryRegionData;
        return countryRegionData;
      })
    );
  }

}
