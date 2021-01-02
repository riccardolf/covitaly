import {Injectable} from '@angular/core';
import {Papa} from "ngx-papaparse";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private andamentoNazionaleUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv";

  private regioniUrl = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv";

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

  getRegioni(): Observable<any> {
    return new Observable<any>(observer => {
      this.papa.parse(this.regioniUrl, {
        header: true,
        download: true,
        skipEmptyLines: true,
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
