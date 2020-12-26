import { Component, OnInit } from '@angular/core';
import { Dantoc } from '@app/_models/dm/dantoc';
import { DantocService } from '@app/_services/dantoc.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dantoc',
  templateUrl: './dantoc.component.html',
  styleUrls: ['./dantoc.component.scss']
})
export class DantocComponent implements OnInit {

  dantocs: Dantoc[] = [];

  constructor(
    private dantocService: DantocService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.get_dantoc();
  }

  get_dantoc(): void {
    this.dantocService.get_dantoc()
      .subscribe(
        _data => {
          this.dantocs = _data;
        }
      )
  }

  toggle(dantoc) {
    this.dantocService.toggle(dantoc)
      .pipe(first())
      .subscribe({
        next: (_data) => {
          this.toastr.success(_data.message);
          this.get_dantoc();
        },
        error: error => {
          this.toastr.error(error)
        }
      });
  }
}
