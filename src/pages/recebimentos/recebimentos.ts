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
	searchDataInicioVencimento: any = null;
	searchDataFimVencimento: any = null;
	searchDataInicioPagamento: any = null;
	searchDataFimPagamento: any = null;
	searchSituacao: string = '';
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
		return item.venda.pagamento === '1';
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
						var dataVencimento = this.vendas[this.p].venda.parcelamento[this.q].data;
						var ativo = this.vendas[this.p].venda.parcelamento[this.q].ativo;

						if(this.searchDataInicioVencimento){
							
							this.searchDataInicioVencimento = this.validarConverterData(this.searchDataInicioVencimento);
							dataVencimento = this.validarConverterData(dataVencimento);

							if(this.searchDataInicioVencimento >= dataVencimento){
								continue a; 	
							}
						}

						if(this.searchDataFimVencimento){

							this.searchDataFimVencimento = this.validarConverterData(this.searchDataFimVencimento);
							dataVencimento = this.validarConverterData(dataVencimento);

							if(this.searchDataFimVencimento <= dataVencimento){
								continue a; 	
							}
						}

						if(this.searchDataInicioPagamento && dataPagamento){
							this.searchDataInicioPagamento = this.validarConverterData(this.searchDataInicioPagamento);
							dataPagamento = this.validarConverterData(dataPagamento);
							if(this.searchDataInicioPagamento >= dataPagamento){
								continue a; 	
							}
						}

						if(this.searchDataFimPagamento && dataPagamento){
							this.searchDataFimPagamento = this.validarConverterData(this.searchDataFimPagamento);
							dataPagamento = this.validarConverterData(dataPagamento);
							if(this.searchDataFimPagamento <= dataPagamento){
								continue a; 	
							}
						}

						if(this.searchSituacao && this.searchSituacao != ''){
							if(this.searchSituacao != ativo.toString()){
								continue a;
							}	
						}
						
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
					var objeto = <any> {};
					objeto.nome = this.vendas[this.p].venda.nome;
					objeto.recebimentos = recebimentos;
					objeto.venda = this.vendas[this.p];
					this.recebimentos.push(objeto);
				}
			}


			if(this.searchTerm && this.searchTerm !== '')
				this.recebimentos = this.filterItems(this.searchTerm, this.recebimentos);

		}); 
	}

	validarConverterData(data){
		if(data.length == 10){
			return new Date(data.toString().split("-")[0],(data.toString().split("-")[1])-1,data.toString().split("-")[2]);
		}
		return data;
	}

	filterItems(searchTerm, vendas){
		return vendas && vendas.filter((item) => {
			return item && item.venda && item.venda.nome && item.venda.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
		});    
	}

	visualizarPagamentos(item) {
    	this.navCtrl.push('PagamentosPage', { key: item.venda.key, venda: item.venda.venda });
  	}

}
