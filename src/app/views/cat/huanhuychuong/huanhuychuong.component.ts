import { Component, OnInit } from '@angular/core';
import { Huanhuychuong } from '@app/_models/dm/huanhuychuong';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { HuanhuychuongService } from '@app/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ExtHuanhuychuongComponent } from './ext-huanhuychuong.component';

@Component({
  selector: 'app-huanhuychuong',
  templateUrl: './huanhuychuong.component.html',
  styleUrls: ['./huanhuychuong.component.scss']
})
export class HuanhuychuongComponent implements OnInit {
  huanchuongs: Huanhuychuong[] = [];

  modalRef: BsModalRef;

  constructor(
    private huanchuongService: HuanhuychuongService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.huanchuongService.get_all()
      .subscribe(
        _data => {
          this.huanchuongs = _data;
        }
      )
  }

  toggle(bangkhen: Huanhuychuong) {
    this.huanchuongService.chuyen_trangthai(bangkhen)
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
      ExtHuanhuychuongComponent,
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

  edit(bangkhen: Huanhuychuong) {
    const initialState = { title: 'Cập nhật', data: bangkhen };
    this.modalRef = this.modalService.show(
      ExtHuanhuychuongComponent,
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
        this.huanchuongService.delete(ma)
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
