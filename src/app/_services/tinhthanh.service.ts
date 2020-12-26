import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { Tinh } from '@app/_models/dm/tinh';
import { Huyen } from '@app/_models/dm/huyen';
import { Phuongxa } from '@app/_models/dm/phuongxa';

const baseUrl = `${environment.apiURL}/api/dm/hanh-chinh`;

@Injectable({
  providedIn: 'root'
})
export class TinhthanhService {

  constructor(private http: HttpClient) { }

  get_tinh(){
    return this.http.get<Tinh[]>(`${baseUrl}/tinh`);
  }

  get_tinh_by_ma(ma: string) {
    return this.http.get<Tinh>(`${baseUrl}/tinh/${ma}`);
  }

  get_huyen(matinh: string) {
    return this.http.get<Huyen[]>(`${baseUrl}/huyen_matinh/${matinh}`);
  } 

  get_phuongxa(mahuyen: string) {
    return this.http.get<Phuongxa[]>(`${baseUrl}/phuongxa_mahuyen/${mahuyen}`);
  }
}
