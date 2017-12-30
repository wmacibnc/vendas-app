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
	q: number;
	recebimentos = [];


	constructor(public navCtrl: NavController, private vendasProvider: VendasProvider, public navParams: NavParams) {
	}

	ionViewDidEnter() {
		this.pesquisar();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecebimentosPage');
	}

	desabiltarPagamento(item){
		return item.pagamento === '1';
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

			
			for(this.p=0; this.p < this.vendas.length; this.p++){
				var recebimentos = [];
				for(this.q=0; this.q < this.vendas[this.p].venda.parcelamento.length; this.q++){
					if(this.vendas[this.p].venda.parcelamento[this.q].data){
						var objetoRecebimento = {};
						objetoRecebimento.parcela = this.q;
						objetoRecebimento.data = this.vendas[this.p].venda.parcelamento[this.q].data;
						objetoRecebimento.dataPagamento = this.vendas[this.p].venda.parcelamento[this.q].dataPagamento;
						objetoRecebimento.valor = this.vendas[this.p].venda.parcelamento[this.q].valor;
						objetoRecebimento.ativo = this.vendas[this.p].venda.parcelamento[this.q].ativo;
						recebimentos.push(objetoRecebimento);
					}
				}
				if(recebimentos && recebimentos.length > 0){
					var objeto = {};
					objeto.nome = this.vendas[this.p].venda.nome;
					objeto.recebimentos = recebimentos;
					objeto.venda = this.vendas[this.p].venda;
					this.recebimentos.push(objeto);
				}
			}
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

  filterItems(searchTerm, vendas){
  	return vendas && vendas.filter((item) => {
  		return item && item.venda && item.venda.nome && item.venda.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  	});    
  }

}
