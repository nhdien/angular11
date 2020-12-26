import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dantoc } from '@app/_models/dm/dantoc';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiURL}/api/dm/dan-toc`;
@Injectable({
  providedIn: 'root'
})
export class DantocService {

  constructor(private http: HttpClient) { }

  get_dantoc() {
    return this.http.get<Dantoc[]>(baseUrl);
  }

  toggle(dantoc: Dantoc): Observable<any> {
    return this.http.post(
      `${baseUrl}/cap-nhat-trang-thai`,
      {
        'ma': dantoc.MA,
        'trangthai': dantoc.TRANGTHAI == 0 ? 1 : 0
      },
      { withCredentials: true }
    );
  }
}
