import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { QhthannhanComponent } from "@app/views/cat/qhthannhan/qhthannhan.component";

import { CapbacComponent } from "./capbac/capbac.component";
import { DanhhieuComponent } from "./danhhieu/danhhieu.component";

import { DantocComponent } from "./dantoc/dantoc.component";
import { HocvanComponent } from "./hocvan/hocvan.component";
import { HuanhuychuongComponent } from "./huanhuychuong/huanhuychuong.component";
import { LoaibangkhenComponent } from "./loaibangkhen/loaibangkhen.component";
import { TinhthanhComponent } from './tinhthanh/tinhthanh.component';
import { TongiaoComponent } from "./tongiao/tongiao.component";

const routes: Routes = [
    { path: 'dia-phuong',           component: TinhthanhComponent },
    { path: 'dan-toc',              component: DantocComponent },
    { path: 'ton-giao',             component: TongiaoComponent },
    { path: 'quan-he-than-nhan',    component: QhthannhanComponent },
    { path: 'hoc-van',              component: HocvanComponent },
    { path: 'cap-bac',              component: CapbacComponent },
    { path: 'danh-hieu',            component: DanhhieuComponent },
    { path: 'loai-bang-khen',       component: LoaibangkhenComponent },
    { path: 'huan-huy-chuong',      component: HuanhuychuongComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppDmRoutingModule {}