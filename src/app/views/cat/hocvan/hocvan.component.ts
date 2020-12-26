import { Component, OnInit } from '@angular/core';
import { Hocvan } from '@app/_models/dm/hocvan';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { HocvanService } from '@app/_services/hocvan.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ExtHocvanComponent } from './ext.hocvan.component';

@Component({
  selector: 'app-hocvan',
  templateUrl: './hocvan.component.html',
  styleUrls: ['./hocvan.component.scss']
})
export class HocvanComponent implements OnInit {

  modalRef: BsModalRef;

  hocvans: Hocvan[] = [];

  constructor(
    private hvService: HocvanService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.hvService.get_all()
      .subscribe(
        _data => {
          this.hocvans = _data;
        }
      )
  }

  toggle(hocvan: Hocvan) {
    this.hvService.chuyen_trangthai(hocvan)
      .pipe(first())
      .subscribe({
        next: (_data) => {
          this.toastr.success(_data.message);
          this.get_all();
        },
        error: error => {
          this.toastr.error(error)
        }
      }
      );
  }

  add() {
    const initialState = { title: 'Thêm mới' };
    this.modalRef = this.modalService.show(
      ExtHocvanComponent,
      Object.assign({}, {
        animated: true, keyboard: false, backdrop: false, ignoreBackdropClick: true
      }, {
        class: 'modal-md', initialState
      }));

    this.modalRef.content.event
      .subscribe(arg => {
        if (arg) {
          this.get_all();
        }
      });
  }

  edit(hocvan: Hocvan) {
    const initialState = { title: 'Cập nhật', data: hocvan };
    this.modalRef = this.modalService.show(
		ExtHocvanComponent,
      Object.assign({}, {
        animated: true, keyboard: false, backdrop: false, ignoreBackdropClick: true
      }, {
        class: 'modal-md', initialState
      }));

    this.modalRef.content.event
      .subscribe(arg => {
        if (arg) {
          this.get_all();
        }
      });
  }

  delete(ma: number) {
    let options = {
      prompt: `Bạn có muốn xóa đối tương ${ma} không?`,
      title:`Hồ sơ Người có công`,
      okText:`Đồng ý`,
      cancelText:`Hủy`
    };
    
    this.confirmService.confirm(options).then((res: boolean) => {
      if (res) {
        this.hvService.delete(ma)
        .subscribe({
          next: (_data) => {
            this.toastr.success(_data.message);
            this.get_all();
          },
          error: error => {
            this.toastr.error(error)
          }
        });
      }
    });
  }
}
