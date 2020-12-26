import { Component, OnInit } from '@angular/core';
import { Danhhieu } from '@app/_models/dm/danhhieu';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { DanhhieuService } from '@app/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ExtDanhhieuComponent } from './ext-danhhieu.component';

@Component({
  selector: 'app-danhhieu',
  templateUrl: './danhhieu.component.html',
  styles: [
  ]
})
export class DanhhieuComponent implements OnInit {

  modalRef: BsModalRef;

  danhhieus: Danhhieu[] = [];
  
  constructor(
    private danhieuService: DanhhieuService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.danhieuService.get_all()
      .subscribe(
        _data => {
          this.danhhieus = _data;
        }
      )
  }

  toggle(danhhieu: Danhhieu) {
    this.danhieuService.chuyen_trangthai(danhhieu)
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
      ExtDanhhieuComponent,
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

  edit(danhhieu: Danhhieu) {
    const initialState = { title: 'Cập nhật', data: danhhieu };
    this.modalRef = this.modalService.show(
		ExtDanhhieuComponent,
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
        this.danhieuService.delete(ma)
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
