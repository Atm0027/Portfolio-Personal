import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../components/project-card/project-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ProjectCardComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        ProjectCardComponent,
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
