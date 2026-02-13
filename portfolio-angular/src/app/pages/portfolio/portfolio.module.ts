import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: PortfolioComponent }
];

@NgModule({
    declarations: [
        PortfolioComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PortfolioModule { }
