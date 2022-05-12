import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { MatStyleModule } from 'src/app/mat-style.module';

const declarationImports = [InputComponent];

@NgModule({
  declarations: [...declarationImports],
  imports: [CommonModule, MatStyleModule],
  exports: [...declarationImports]
})
export class FormElementsModule {}
