import { Component, OnInit } from '@angular/core';
import { Loaibangkhen } from '@app/_models/dm/loaibangkhen';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { LoaibangkhenService } from '@app/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ExtLoaibangkhenComponent } from './ext-loaibangkhen.component';

@Component({
  selector: 'app-loaibangkhen',
  templateUrl: './loaibangkhen.component.html',
  styleUrls: ['./loaibangkhen.component.scss']
})
export class LoaibangkhenComponent implements OnInit {

  bangkhens: Loaibangkhen[] = [];

  modalRef: BsModalRef;

  constructor(
    private bangkhenService: LoaibangkhenService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.bangkhenService.get_all()
      .subscribe(
        _data => {
          this.bangkhens = _data;
        }
      )
  }

  toggle(bangkhen: Loaibangkhen) {
    this.bangkhenService.chuyen_trangthai(bangkhen)
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
      ExtLoaibangkhenComponent,
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

  edit(bangkhen: Loaibangkhen) {
    const initialState = { title: 'Cập nhật', data: bangkhen };
    this.modalRef = this.modalService.show(
      ExtLoaibangkhenComponent,
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
        this.bangkhenService.delete(ma)
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
