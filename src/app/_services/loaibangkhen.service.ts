import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loaibangkhen } from '@app/_models/dm/loaibangkhen';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/loai-bang-khen`;

@Injectable({
  providedIn: 'root'
})
export class LoaibangkhenService {

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<Loaibangkhen[]>(baseUrl);
  }

  get(id: number) {
    return this.http.get<Loaibangkhen>(`${baseUrl}/ma/${id}`);
  }

  get_trangthai(trangthai: number) {
    return this.http.get<Loaibangkhen>(`${baseUrl}/trang-thai/${trangthai}`);
  }

  chuyen_trangthai(loaibangkhen: Loaibangkhen): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'id': loaibangkhen.ID,
        'trangthai': loaibangkhen.TRANGTHAI == 0 ? 1 : 0
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
