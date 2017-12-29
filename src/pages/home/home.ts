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
  searchDataInicio: Date = null;
  searchDataFim: Date = null;
  searchNumeracao : null;
  searchPagamento : null;

  constructor(public navCtrl: NavController, private vendasProvider: VendasProvider, private toast: ToastController) { }

  ionViewDidEnter() {

    this.pesquisar();

    // this.vendasProvider.getAll()
    //   .then((result) => {
    //     this.vendas = result;
    //   });
  }

  desabiltarPagamento(item){
    return item.venda.pagamento === '1';
  }

  pesquisar(){
    this.vendasProvider.getAll().then((result) => {
      this.vendas = result;

      if(this.searchTerm && this.searchTerm !== '')
        this.vendas = this.filterItems(this.searchTerm, this.vendas);

      if(this.searchDataInicio)
        this.vendas = this.filterItemsPorDataInicio(this.searchDataInicio, this.vendas);

      if(this.searchDataFim)
        this.vendas = this.filterItemsPorDataFim(this.searchDataFim, this.vendas);

      if(this.searchMarca && this.searchMarca !== '')
        this.vendas = this.filterItemsPorMarca(this.searchMarca, this.vendas);

      if(this.searchNumeracao)
        this.vendas = this.filterItemsNumeracao(this.searchNumeracao, this.vendas);

      if(this.searchPagamento)
        this.vendas = this.filterItemsPagamento(this.searchPagamento, this.vendas);
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

  visualizarPagamentos(item: VendaList) {
    this.navCtrl.push('PagamentosPage', { key: item.key, venda: item.venda });
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