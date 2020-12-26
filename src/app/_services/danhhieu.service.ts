import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Danhhieu } from '@app/_models/dm/danhhieu';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/danh-hieu`;

@Injectable({
  providedIn: 'root'
})
export class DanhhieuService {

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<Danhhieu[]>(baseUrl);
  }

  get(id: number) {
    return this.http.get<Danhhieu>(`${baseUrl}/ma/${id}`);
  }

  get_trangthai(trangthai: number) {
    return this.http.get<Danhhieu>(`${baseUrl}/trang-thai/${trangthai}`);
  }

  chuyen_trangthai(danhhieu: Danhhieu): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'id': danhhieu.ID,
        'trangthai': danhhieu.TRANGTHAI == 0 ? 1 : 0
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

  delete(ma: number): Observable<any> {
    return this.http.post(
      `${baseUrl}/xoa/${ma}`,
      { withCredentials: true }
    );
  }
}
