import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capbac } from '@app/_models/dm/capbac';
import { CapbacService } from '@app/_services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ext-capbac',
  templateUrl: './ext-capbac.component.html',
  styles: [
  ]
})
export class ExtCapbacComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: Capbac = null;

  @Output() event = new EventEmitter<boolean>();

  form: FormGroup;
  loading = false;
  submitted = false;

  isedit: boolean = false;

  constructor(
    private cbService: CapbacService,
    public modalRef: BsModalRef,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      thutu: ['', Validators.required],
      capbac: ['', Validators.required],
      ghichu: [''],
      trangthai: 1
    });

    if (this.data != null) {
      this.isedit = true;
      this.form.patchValue({
        'id': this.data.ID,
        'thutu': this.data.THUTU,
        'capbac': this.data.CAPBAC,
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
        'capbac':this.f.capbac.value,
        'ghichu':this.f.ghichu.value,
        'trangthai':this.f.trangthai.value
    };

    if (this.isedit) {
        model.id = this.data.ID;
        this.cbService.update(JSON.stringify(model))
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
        this.cbService.insert(JSON.stringify(model))
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
