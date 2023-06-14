import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorComponent } from './generator.component';



@NgModule({
    declarations: [
        GeneratorComponent
    ],
    exports: [
        GeneratorComponent
    ],
    imports: [
        CommonModule
    ]
})
export class GeneratorModule { }
