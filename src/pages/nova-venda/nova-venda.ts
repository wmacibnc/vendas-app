import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { VendasProvider, Venda } from '../../providers/vendas/vendas';

@IonicPage()
@Component({
  selector: 'nova-venda',
  templateUrl: 'nova-venda.html',
})
export class NovaVendaPage {
  model: Venda;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendaProvider: VendasProvider, private toast: ToastController) {
    if (this.navParams.data.venda && this.navParams.data.key) {
      this.model = this.navParams.data.venda;
      this.key =  this.navParams.data.key;
    } else {
      this.model = new Venda();
    }
  }

  save() {
    this.saveVenda()
      .then(() => {
        this.toast.create({ message: 'Venda salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a venda.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveVenda() {
    if (this.key) {
      return this.vendaProvider.update(this.key, this.model);
    } else {
      return this.vendaProvider.insert(this.model);
    }
  }

}