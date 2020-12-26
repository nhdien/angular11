import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qhthannhan } from '@app/_models/dm/qhthannhan';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/quan-he-than-nhan`;

@Injectable({
  providedIn: 'root'
})
export class QhthannhanService {

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<Qhthannhan[]>(baseUrl);
  }

  get(id: number) {
    return this.http.get<Qhthannhan>(`${baseUrl}/ma/${id}`);
  }

  get_trangthai(trangthai: number) {
    return this.http.get<Qhthannhan>(`${baseUrl}/trang-thai/${trangthai}`);
  }

  chuyen_trangthai(quanhe: Qhthannhan): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'id': quanhe.ID,
        'trangthai': quanhe.TRANGTHAI == 0 ? 1 : 0
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
