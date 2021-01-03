import {Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as am4maps from '@amcharts/amcharts4/maps';
import {CovidService} from "../covid/covid.service";
import {PositiveNegativeNumberPipe} from "../util/positive-negative-number.pipe";
import {IdRegionePipe} from "../util/id-regione-pipe.pipe";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private chart: am4maps.MapChart;
  private mapData: MapData[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
    private covidService: CovidService,
    private positiveNegativeNumberPipe: PositiveNegativeNumberPipe,
    private idRegionePipe: IdRegionePipe) {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
    this.covidService.getRegioni().subscribe(data => {
      data.forEach(element => {
        this.mapData.push(new MapData(
          this.idRegionePipe.transform(element.codice_regione),
          element.totale_positivi,
          this.positiveNegativeNumberPipe.transform(element.nuovi_positivi)));
      });
    });
  }


  ngAfterViewInit() {
    this.browserOnly(() => {
      Promise.all([
        import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/core"),
        import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/charts"),
        import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4/maps"),
        import(/* webpackChunkName: "amcharts" */ "@amcharts/amcharts4-geodata/italyLow")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4maps = modules[2];
        const am4geodata_italyLow = modules[3].default;

        // Chart code goes here
        // Create map instance
        let chart = am4core.create("mapDiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_italyLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        //Set min/max fill color for each area
        polygonSeries.heatRules.push({
          property: "fill",
          target: polygonSeries.mapPolygons.template,
          min: am4core.color("#FEE2E2"),
          max: am4core.color("#B91C1C")
        });

        // Make map load polygon data (state shapes and names) from GeoJSON
        polygonSeries.useGeodata = true;

        // Set heatmap values for each state
        this.covidService.getRegioni().subscribe(data => {
          data.forEach(element => {
            this.mapData.push(new MapData(
              this.idRegionePipe.transform(element.codice_regione),
              element.totale_positivi,
              this.positiveNegativeNumberPipe.transform(element.nuovi_positivi)));
          });
          polygonSeries.data = this.mapData;
        });

        // Set up heat legend
        let heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.width = am4core.percent(20);
        heatLegend.marginRight = am4core.percent(4);
        heatLegend.minValue = 0;
        heatLegend.maxValue = 50000;

        // Set up custom heat map legend labels using axis ranges
        var minRange = heatLegend.valueAxis.axisRanges.create();
        minRange.value = heatLegend.minValue;
        minRange.label.text = "0";
        var maxRange = heatLegend.valueAxis.axisRanges.create();
        maxRange.value = heatLegend.maxValue;
        maxRange.label.text = "50000";

        // Blank out internal heat legend value axis labels
        heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (labelText) {
          return "";
        });

        // Configure series tooltip
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value} ({difference})";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#7F1D1D");
      }).catch((e) => {
        console.error("Error when creating chart", e);
      })
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}

export class MapData {
  id: string;
  value: number;
  difference: string;

  constructor(id: string, value: number, difference: string) {
    this.id = id;
    this.value = value;
    this.difference = difference;
  }
}
