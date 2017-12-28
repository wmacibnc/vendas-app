import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { VendasProvider, VendaList } from '../../providers/vendas/vendas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  vendas: VendaList[];
  searchTerm: string = '';

  constructor(public navCtrl: NavController, private vendasProvider: VendasProvider, private toast: ToastController) { }

  ionViewDidEnter() {

    this.setFilteredItems();

    this.vendasProvider.getAll()
      .then((result) => {
        this.vendas = result;
      });
  }

  setFilteredItems() {
    this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItems(this.searchTerm, result);
    });    
  }


  filterItems(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.nome && item.venda.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    
  }

  addContact() {
    // this.navCtrl.push('EditContactPage');
    this.navCtrl.push('NovaVendaPage');
  }

  editContact(item: VendaList) {
    this.navCtrl.push('NovaVendaPage', { key: item.key, venda: item.venda });
  }

  removeContact(item: VendaList) {
    this.vendasProvider.remove(item.key)
      .then(() => {
        // Removendo do array de items
        var index = this.vendas.indexOf(item);
        this.vendas.splice(index, 1);
        this.toast.create({ message: 'Venda removida.', duration: 3000, position: 'botton' }).present();
      })
  }

}