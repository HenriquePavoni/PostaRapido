import { NgModule } from '@angular/core';
import { MaskDirective } from './mask/mask.directive';

@NgModule({
  declarations: [MaskDirective],
  exports: [MaskDirective]
})
export class SharedModule { }
