import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaVendaPage } from './nova-venda';

@NgModule({
  declarations: [
    NovaVendaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaVendaPage),
  ],
})
export class NovaVendaPageModule {}
