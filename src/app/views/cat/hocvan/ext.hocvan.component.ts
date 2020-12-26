import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Hocvan } from "@app/_models/dm/hocvan";
import { HocvanService } from "@app/_services/hocvan.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";


@Component ({
    selector: 'app-hocvan-ext',
    templateUrl: './ext.hocvan.component.html'
})
export class ExtHocvanComponent implements OnInit {
    @Input() title: string = '';
    @Input() data: Hocvan = null;

    @Output() event = new EventEmitter<boolean>();

    form: FormGroup;
    loading = false;
    submitted = false;

    isedit: boolean = false;
    
    constructor(
        private hvService: HocvanService,
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
            ten: ['', Validators.required],
            mota: [''],
            trangthai: 1
        });

        if (this.data != null){
            this.isedit = true;
            this.form.patchValue({
                'id': this.data.ID,
                'thutu': this.data.THUTU,
                'ten':this.data.TEN,
                'mota':this.data.MOTA,
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
            'ten':this.f.ten.value,
            'mota':this.f.mota.value,
            'trangthai':this.f.trangthai.value
        };

        if (this.isedit) {
            model.id = this.data.ID;
            this.hvService.update(JSON.stringify(model))
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
            this.hvService.insert(JSON.stringify(model))
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