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
  parcelas =[];
  p: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private vendaProvider: VendasProvider, private toast: ToastController) {
    if (this.navParams.data.venda && this.navParams.data.key) {
      this.model = this.navParams.data.venda;
      this.key =  this.navParams.data.key;
      this.atualizarParcelas();
    } else {
      this.model = new Venda();
      this.model.parcelamento = [];
      this.model.parcelamento.push([]);
      this.model.parcelamento.push([]);
      this.model.parcelamento.push([]);
      this.model.parcelamento.push([]);
      this.model.parcelamento.push([]);
      this.model.parcelamento.push([]);
    }
  }

  save() {
    this.saveVenda()
    .then(() => {
      this.toast.create({ message: 'Venda salva.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao salvar a venda.', duration: 3000, position: 'botton' }).present();
    });
  }

  atualizarParcelas(){
    this.parcelas = [];
    for (var i = 1; i <= this.model.parcelas; i++) {
      this.parcelas.push(i);
    }
  }

  private saveVenda() {
    if(this.model.pagamento === '2'){
      this.model.valor = 0;
      for(this.p=0; this.p < this.model.parcelamento.length; this.p++){
        if(this.model.parcelamento[this.p] && this.model.parcelamento[this.p].valor){
          this.model.valor = (+this.model.parcelamento[this.p].valor) + (this.model.valor);
          if(!this.key){
            this.model.parcelamento[this.p].ativo = false;
            this.model.parcelamento[this.p].dataPagamento = null;
          }
          if(this.p==0){
           this.model.parcelamento[this.p].ativo = true;
           this.model.parcelamento[this.p].dataPagamento = new Date();
          }
        }
      }
    }
    if (this.key) {
      return this.vendaProvider.update(this.key, this.model);
    } else {
      return this.vendaProvider.insert(this.model);
    }
  }

}