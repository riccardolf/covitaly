import {Injectable} from '@angular/core';
import {Papa} from "ngx-papaparse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  const
  andamentoNazionaleUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv";

  constructor(private papa: Papa) {
  }

  getAndamentoNazionale(): Observable<any> {
    return new Observable<any>(observer => {
      this.papa.parse(this.andamentoNazionaleUrl, {
        header: true,
        download: true,
        complete: results => {
          observer.next(results.data);
          observer.complete();
        },
        error: error => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }
}
