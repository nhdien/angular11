import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loaibangkhen } from '@app/_models/dm/loaibangkhen';
import { LoaibangkhenService } from '@app/_services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-ext-loaibangkhen',
  templateUrl: './ext-loaibangkhen.component.html',
  styles: [
  ]
})
export class ExtLoaibangkhenComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: Loaibangkhen = null;

  @Output() event = new EventEmitter<boolean>();

  form: FormGroup;
  loading = false;
  submitted = false;

  isedit: Boolean = false;

  constructor(
    private bangkhenService: LoaibangkhenService,
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      thutu: ['', Validators.required],
      ten: ['', Validators.required],
      ghichu: [''],
      trangthai: 1
    });

    if (this.data != null) {
      this.isedit = true;
      this.form.patchValue({
        'id': this.data.ID,
        'thutu': this.data.THUTU,
        'ten': this.data.TEN,
        'ghichu': this.data.GHICHU,
        'trangthai': this.data.TRANGTHAI
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
      'ten': this.f.ten.value,
      'ghichu': this.f.ghichu.value,
      'trangthai': this.f.trangthai.value
    };

    if (this.isedit) {
      model.id = this.data.ID;
      this.bangkhenService.update(JSON.stringify(model))
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
      this.bangkhenService.insert(JSON.stringify(model))
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
