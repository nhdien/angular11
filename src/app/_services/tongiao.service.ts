import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tongiao } from '@app/_models/dm/tongiao';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/ton-giao`;

@Injectable({
  providedIn: 'root'
})
export class TongiaoService {

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<Tongiao[]>(baseUrl);
  }

  get(ma: string) {
    return this.http.get<Tongiao>(`${baseUrl}/ma/${ma}`);
  }

  get_trangthai(trangthai: number) {
    return this.http.get<Tongiao>(`${baseUrl}/trang-thai/${trangthai}`);
  }

  chuyen_trangthai(tongiao: Tongiao): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'ma': tongiao.MA,
        'trangthai': tongiao.TRANGTHAI == 0 ? 1 : 0
      },
      { withCredentials: true }
    );
  }

  insert(model: any): Observable<any> {
    return this.http.post(
      `${baseUrl}/them-moi`,
      {
        'prmdata': model
      },
      { withCredentials: true }
    );
  }

  update(model: any): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat`,
      {
        'prmdata': model
      },
      { withCredentials: true }
    );
  }

  delete(ma: string): Observable<any> {
    return this.http.post(
      `${baseUrl}/xoa/${ma}`,
      { withCredentials: true }
    );
  }
}
