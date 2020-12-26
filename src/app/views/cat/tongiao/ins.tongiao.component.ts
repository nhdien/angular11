import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TongiaoService } from '@app/_services/tongiao.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-tongiao-ins',
    templateUrl: './ins.tongiao.component.html'
})

export class InsTongiaoComponent implements OnInit {
    title: string;

    form: FormGroup;
    loading = false;
    submitted = false;

    @Output() event = new EventEmitter();
    constructor(
        private tongiaoService: TongiaoService,
        public modalRef: BsModalRef,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
    ) { }

    get f() { return this.form.controls; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            ma: ['', Validators.required],
            ten: ['', Validators.required]
        });
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
            'trangthai': 1
        };

        this.tongiaoService.insert(JSON.stringify(model))
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