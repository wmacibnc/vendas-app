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
  searchMarca: string = '';
  searchDataInicio: Date = new Date();
  searchDataFim: Date = new Date();
  searchNumeracao : number = 0;
  searchPagamento : number = 0;

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

  setFilteredDataInicio(){
  this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItemsPorDataInicio(this.searchDataInicio, result);
    });    
  }

  setFilteredDataFim(){
  this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItemsPorDataFim(this.searchDataFim, result);
    });    
  }

  setFilteredMarcas() {
    this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItemsPorMarca(this.searchMarca, result);
    });    
  }

  setFilteredNumeracao() {
    this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItemsNumeracao(this.searchNumeracao, result);
    });    
  }

  setFilteredPagamento() {
    this.vendasProvider.getAll().then((result) => {
      this.vendas = this.filterItemsPagamento(this.searchPagamento, result);
    });    
  }

  filterItemsNumeracao(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.data && item.venda.numeracao === searchTerm;
    });    
  }

  filterItemsPagamento(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.data && item.venda.pagamento ===searchTerm;
    });    
  }

  filterItemsPorDataInicio(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.data && item.venda.data >= searchTerm;
    });    
  }

  filterItemsPorDataFim(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.data && item.venda.data <= searchTerm;
    });    
  }

  filterItemsPorMarca(searchTerm, vendas){
    return vendas && vendas.filter((item) => {
      return item && item.venda && item.venda.marca && item.venda.marca.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
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