import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecebimentosPage } from './recebimentos';

@NgModule({
  declarations: [
    RecebimentosPage,
  ],
  imports: [
    IonicPageModule.forChild(RecebimentosPage),
  ],
})
export class RecebimentosPageModule {}
