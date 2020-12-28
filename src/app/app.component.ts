import {Component} from '@angular/core';
import {CovidService} from "./covid/covid.service";
import {ParseResult} from "ngx-papaparse/lib/interfaces/parse-result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covitaly';
  parsedCsv: ParseResult;
  today: any;
  yesterday: any;

  constructor(private covidService: CovidService) {
  }

  ngOnInit() {
    this.getAndamentoNazionale();
  }

  getAndamentoNazionale(): void {
    this.covidService.getAndamentoNazionale()
      .subscribe(data => {
        this.parsedCsv = data;
        this.today = data[data.length - 2];
        this.yesterday = data[data.length - 3];
        console.log(this.today);
      });
  }
}
