import { Component } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'nova-venda',
  templateUrl: 'nova-venda.html',
})
export class NovaVendaPage {
nome : String;
telefone: String;
marca: String;
data: String;
valor: String;
active: String;
numeracao: String;
modelo: String;

  constructor(public navCtrl: NavController) {
  }

  save() {
  }

}