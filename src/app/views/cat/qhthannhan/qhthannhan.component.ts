import { Component, OnInit } from '@angular/core';
import { Qhthannhan } from '@app/_models/dm/qhthannhan';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { QhthannhanService } from '@app/_services/qhthannhan.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { InsQuanheComponent } from './ins.qhthanhan.component';

@Component({
  selector: 'app-qhthannhan',
  templateUrl: './qhthannhan.component.html',
  styleUrls: ['./qhthannhan.component.scss']
})
export class QhthannhanComponent implements OnInit {
  modalRef: BsModalRef;
  
  quanhes: Qhthannhan[] = [];

  constructor(
    private quanheService: QhthannhanService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
    this.get_all();
  }

  get_all() {
    this.quanheService.get_all()
      .subscribe(
        _data => {
          this.quanhes = _data;
        }
      )
  }

  toggle(quanhe) {
    this.quanheService.chuyen_trangthai(quanhe)
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
      InsQuanheComponent,
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

  edit(quanhe: Qhthannhan) {
    const initialState = { title: 'Cập nhật', data: quanhe };
    this.modalRef = this.modalService.show(
      InsQuanheComponent,
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
        this.quanheService.delete(ma)
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


