import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Qhthannhan } from "@app/_models/dm/qhthannhan";
import { QhthannhanService } from "@app/_services/qhthannhan.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-qhthanhnhan-ins',
    templateUrl: './ins.qhthannhan.component.html'
  })
  export class InsQuanheComponent implements OnInit {
    @Input() title: string;
    @Input() data: Qhthannhan = null;

    @Output() event = new EventEmitter<boolean>();
    
    form: FormGroup;
    loading = false;
    submitted = false;

    isedit: boolean = false;

    constructor(
        private qhService: QhthannhanService,
        public modalRef: BsModalRef,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
    ) {
      
    }

    get f() { return this.form.controls; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: ['', Validators.required],
            thutu: ['', Validators.required],
            quanhe: ['', Validators.required],
            ghichu: [''],
            trangthai: 1
        });

        if (this.data != null){
            this.isedit = true;
            this.form.patchValue({
                'id': this.data.ID,
                'thutu': this.data.THUTU,
                'quanhe':this.data.QUANHE,
                'ghichu':this.data.GHICHU,
                'trangthai':this.data.TRANGTHAI
            });
        }
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const model = {
            'id': this.f.id.value,
            'thutu': this.f.thutu.value,
            'quanhe':this.f.quanhe.value,
            'ghichu':this.f.ghichu.value,
            'trangthai':this.f.trangthai.value
        };

        if (this.data != null) {
            model.id = this.data.ID;
            this.qhService.update(JSON.stringify(model))
            .subscribe({
                next: (_data) => {
                    this.toastr.success(_data.message);
                    this.event.emit(true);
                    this.modalRef.hide();
                  },
                  error: error => {
                    this.toastr.error(error)
                  }
            });
        }
        else {
            this.qhService.insert(JSON.stringify(model))
            .subscribe({
                next: (_data) => {
                    this.toastr.success(_data.message);
                    this.event.emit(true);
                    this.modalRef.hide();
                  },
                  error: error => {
                    this.toastr.error(error)
                  }
            });
        }
    }
  }