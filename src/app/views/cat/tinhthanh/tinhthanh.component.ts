import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Tinh } from '@app/_models/dm/tinh';
import { TinhthanhService } from '@app/_services/tinhthanh.service';
import { Huyen } from '@app/_models/dm/huyen';
import { Phuongxa } from '@app/_models/dm/phuongxa';

@Component({
  selector: 'app-tinhthanh',
  templateUrl: './tinhthanh.component.html',
  styleUrls: ['./tinhthanh.component.scss']
})
export class TinhthanhComponent implements OnInit {

  tinhs: Tinh[] = [];
  huyens: Huyen[] = [];
  phuongxas: Phuongxa[] = [];

  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  constructor(
    private tinhService: TinhthanhService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.get_tinhs();
  }

  get_tinhs(): void {
    this.tinhService.get_tinh()
      .subscribe(
        _data => {
          this.tinhs = _data;
        }
      );
  }

  get_huyens(tinh: Tinh, template: TemplateRef<any>): void {
    this.tinhService.get_huyen(tinh.MA)
    .subscribe(
      _data => {
        this.huyens = _data;
      }
    );
    
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg xlg' }));
  }

  get_phuongxas(huyen: Huyen, template: TemplateRef<any>): void {
    this.tinhService.get_phuongxa(huyen.MA)
      .subscribe(
        _data => {
          this.phuongxas = _data;
        }
      );

    this.modalRef2 = this.modalService.show(template, Object.assign({}, { class: 'modal-lg xlg' }));
  }
}
