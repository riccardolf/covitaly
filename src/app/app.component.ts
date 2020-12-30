import {Component} from '@angular/core';
import {CovidService} from "./covid/covid.service";
import {ParseResult} from "ngx-papaparse/lib/interfaces/parse-result";
import {registerLocaleData} from "@angular/common";
import it from "@angular/common/locales/it";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covitaly';
  parsedCsv: ParseResult;
  today: any;
  yesterday: any;
  loading: boolean;

  constructor(private covidService: CovidService) {
  }

  ngOnInit() {
    registerLocaleData(it);
    this.getAndamentoNazionale();
  }

  getAndamentoNazionale(): void {
    this.loading = true;
    this.covidService.getAndamentoNazionale()
      .subscribe(data => {
        this.parsedCsv = data;
        this.today = data[data.length - 2];
        this.yesterday = data[data.length - 3];
        this.loading = false;
      });
  }
}
