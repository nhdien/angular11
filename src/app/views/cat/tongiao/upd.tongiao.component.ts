import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { Tongiao } from "@app/_models/dm/tongiao";
import { TongiaoService } from "@app/_services/tongiao.service";

@Component({
    selector: 'app-tongiao-upd',
    templateUrl: './upd.tongiao.component.html'
})
export class UpdTongiaoComponent implements OnInit {
    @Input() title: string;
    @Input() data: Tongiao;

    @Output() event = new EventEmitter<boolean>();

    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private tongiaoService: TongiaoService,
        public modalRef: BsModalRef,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
    ) {}

    get f() { return this.form.controls; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            ma: ['', Validators.required],
            ten: ['', Validators.required],
            trangthai: 0
        });
        this.form.patchValue({
            'ma': this.data.MA,
            'ten': this.data.TEN,
            'trangthai': this.data.TRANGTHAI
        })
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        const model = {
            'ma':this.f.ma.value,
            'ten':this.f.ten.value,
            'trangthai': this.f.trangthai.value
        };

        this.tongiaoService.update(JSON.stringify(model))
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