import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class VendasProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(venda: Venda) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, venda);
  }

  public update(key: string, venda: Venda) {
    return this.save(key, venda);
  }

  private save(key: string, venda: Venda) {
    return this.storage.set(key, venda);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {

    let vendas: VendaList[] = [];

    return this.storage.forEach((value: Venda, key: string, iterationNumber: Number) => {
      let venda = new VendaList();
      venda.key = key;
      venda.venda = value;
      vendas.push(venda);
    })
      .then(() => {
        return Promise.resolve(vendas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Venda {
  nome: string;
  telefone: number;
  marca: string;
  numeracao: number;
  data: Date;
  valor: number;
  pagamento: string;
  parcelamento: any;
  parcelas: number;
  ativo: boolean;
}

export class VendaList {
  key: string;
  venda: Venda;
}