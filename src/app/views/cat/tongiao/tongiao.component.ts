import { Component, OnInit } from '@angular/core';
import { Tongiao } from '@app/_models/dm/tongiao';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { TongiaoService } from '@app/_services/tongiao.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { InsTongiaoComponent } from './ins.tongiao.component';
import { UpdTongiaoComponent } from './upd.tongiao.component';

@Component({
  selector: 'app-tongiao',
  templateUrl: './tongiao.component.html',
  styleUrls: ['./tongiao.component.scss']
})

export class TongiaoComponent implements OnInit {

  tongiaos: Tongiao[] = [];

  modalRef: BsModalRef;

  constructor(
    private tongiaoService: TongiaoService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.tongiaoService.get_all()
      .subscribe(
        _data => {
          this.tongiaos = _data;
        }
      )
  }

  toggle(tongiao) {
    this.tongiaoService.chuyen_trangthai(tongiao)
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
      InsTongiaoComponent,
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

  edit(tongiao: Tongiao) {
    const initialState = { title: 'Cập nhật', data: tongiao };
    this.modalRef = this.modalService.show(
      UpdTongiaoComponent,
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

  delete(ma: string) {
    let options = {
      prompt: `Bạn có muốn xóa đối tương ${ma} không?`,
      title:`Hồ sơ Người có công`,
      okText:`Đồng ý`,
      cancelText:`Hủy`
    };
    
    this.confirmService.confirm(options).then((res: boolean) => {
      if (res) {
        this.tongiaoService.delete(ma)
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