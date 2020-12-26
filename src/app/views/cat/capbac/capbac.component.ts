import { Component, OnInit } from '@angular/core';
import { Capbac } from '@app/_models/dm/capbac';
import { ConfirmService } from '@app/_modules/confirm/confirm.service';
import { CapbacService } from '@app/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ExtCapbacComponent } from './ext-capbac.component';

@Component({
    selector: 'app-capbac',
    templateUrl: './capbac.component.html',
    styleUrls: ['./capbac.component.scss']
})
export class CapbacComponent implements OnInit {
    modalRef: BsModalRef;

    capbacs : Capbac[] = [];

    constructor(
        private cbService: CapbacService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private confirmService: ConfirmService
    ) { }

    ngOnInit(): void {
        this.get_all();
    }

    get_all() {
        this.cbService.get_all()
        .subscribe(
          _data => {
            this.capbacs = _data;
          }
        )
    }

    toggle(capbac: Capbac) {
        this.cbService.chuyen_trangthai(capbac)
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
          ExtCapbacComponent,
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
    
      edit(capbac: Capbac) {
        const initialState = { title: 'Cập nhật', data: capbac };
        this.modalRef = this.modalService.show(
            ExtCapbacComponent,
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
            this.cbService.delete(ma)
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
