import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VendasProvider, VendaList } from '../../providers/vendas/vendas';

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
			this.recebimentos = [];			
			for(this.p=0; this.p < this.vendas.length; this.p++){
				var recebimentos = [];
				a:for(this.q=0; this.q < this.vendas[this.p].venda.parcelamento.length; this.q++){
					if(this.vendas[this.p].venda.parcelamento[this.q].data){
						var dataPagamento = this.vendas[this.p].venda.parcelamento[this.q].dataPagamento;
						var ativo = this.vendas[this.p].venda.parcelamento[this.q].ativo;
						if(!dataPagamento){
							continue a;
						}
						if(this.searchDataInicio){
							var data1 = new Date(this.searchDataInicio.split("-")[0],this.searchDataInicio.split("-")[1], this.searchDataInicio.split("-")[2]);
							if(dataPagamento.getDate){
								var data2 = dataPagamento;
							}else{
								var data2 = new Date(dataPagamento.split("-")[0],dataPagamento.split("-")[1], dataPagamento.split("-")[2]);	
							}
							
							 if(data1 >= data2){
								continue a; 	
							 } 
						}

						if(this.searchDataFim && new Date(this.searchDataFim) <= new Date(dataPagamento)){
							continue a;
						}

						// if(ativo){
						// 	continue a;
						// }

						var objetoRecebimento = <any>{};
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


			if(this.searchTerm && this.searchTerm !== '')
				this.recebimentos = this.filterItems(this.searchTerm, this.recebimentos);

		}); 
	}


	filterItems(searchTerm, vendas){
		return vendas && vendas.filter((item) => {
			return item && item.venda && item.venda.nome && item.venda.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});    
	}

}
