import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { AppDmRoutingModule } from './app.dm-routing.module';

import { DantocComponent } from './dantoc/dantoc.component';

import { TinhthanhComponent } from './tinhthanh/tinhthanh.component';

import { InsTongiaoComponent } from './tongiao/ins.tongiao.component';
import { TongiaoComponent } from './tongiao/tongiao.component';
import { UpdTongiaoComponent } from './tongiao/upd.tongiao.component';

import { QhthannhanComponent } from '@app/views/cat/qhthannhan/qhthannhan.component';
import { InsQuanheComponent } from './qhthannhan/ins.qhthanhan.component';

import { HocvanComponent } from './hocvan/hocvan.component';
import { ExtHocvanComponent } from './hocvan/ext.hocvan.component';

import { DanhhieuComponent } from './danhhieu/danhhieu.component';
import { ExtDanhhieuComponent } from './danhhieu/ext-danhhieu.component';

import { CapbacComponent } from './capbac/capbac.component';
import { ExtCapbacComponent } from './capbac/ext-capbac.component';

import { LoaibangkhenComponent } from './loaibangkhen/loaibangkhen.component';
import { ExtLoaibangkhenComponent } from './loaibangkhen/ext-loaibangkhen.component';

import { HuanhuychuongComponent } from './huanhuychuong/huanhuychuong.component';
import { ExtHuanhuychuongComponent } from './huanhuychuong/ext-huanhuychuong.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppDmRoutingModule
    ],
    declarations: [
        TinhthanhComponent,
        DantocComponent,
        TongiaoComponent, InsTongiaoComponent, UpdTongiaoComponent,
        QhthannhanComponent, InsQuanheComponent,
        HocvanComponent, ExtHocvanComponent,
        DanhhieuComponent, ExtDanhhieuComponent,
        CapbacComponent, ExtCapbacComponent,
        LoaibangkhenComponent, ExtLoaibangkhenComponent,
        HuanhuychuongComponent, ExtHuanhuychuongComponent
    ]
})
export class AppDmModulue {}