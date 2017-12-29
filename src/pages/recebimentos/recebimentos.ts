import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VendasProvider, VendaList, Venda } from '../../providers/vendas/vendas';

@IonicPage()
@Component({
	selector: 'page-recebimentos',
	templateUrl: 'recebimentos.html',
})

export class RecebimentosPage {

	vendas: VendaList[];
	searchTerm: string = '';
	searchDataInicio: Date = null;
	searchDataFim: Date = null;
	p: number;


	constructor(public navCtrl: NavController, private vendasProvider: VendasProvider, public navParams: NavParams) {
	}

	ionViewDidEnter() {
		this.pesquisar();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecebimentosPage');
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

		}); 
	}


	filterItemsPorDataInicio(searchTerm, vendas){
		return vendas && vendas.filter((item) => {
			return item && item.venda && item.venda.data && (

				item.venda.data >= searchTerm

				);
		});    
	}

	filterItemsPorDataFim(searchTerm, vendas){
		return vendas && vendas.filter((item) => {
			return item && item.venda && item.venda.data && (
				item.venda.data <= searchTerm
				);
		});    
	}

  // verificarDataInicio(parcelamento){
  // 	var retorno = false;
  // 	 for(this.p=0; this.p < parcelamento.length; this.p++){
  // 	 	if(parcelamento[this.p].)
  // 	  }
  // }

  filterItems(searchTerm, vendas){
  	return vendas && vendas.filter((item) => {
  		return item && item.venda && item.venda.nome && item.venda.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  	});    
  }

}
