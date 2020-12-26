import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Huanhuychuong } from '@app/_models/dm/huanhuychuong';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/huan-huy-chuong`;

@Injectable({
  providedIn: 'root'
})
export class HuanhuychuongService {

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<Huanhuychuong[]>(baseUrl);
  }

  get(id: number) {
    return this.http.get<Huanhuychuong>(`${baseUrl}/ma/${id}`);
  }

  get_trangthai(trangthai: number) {
    return this.http.get<Huanhuychuong>(`${baseUrl}/trang-thai/${trangthai}`);
  }

  chuyen_trangthai(huanhuychuong: Huanhuychuong): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'id': huanhuychuong.ID,
        'trangthai': huanhuychuong.TRANGTHAI == 0 ? 1 : 0
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
