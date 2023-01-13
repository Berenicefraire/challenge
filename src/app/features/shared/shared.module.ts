import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { RkIconComponent } from './components/rk-icon/rm-icon.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ModalComponent,
    RkIconComponent        
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
],
exports: [
  SpinnerComponent,
  FontAwesomeModule,
  ModalComponent,
  RkIconComponent  
]
})
export class SharedModule { }
