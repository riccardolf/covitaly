import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'idRegione'})
export class IdRegionePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "13": // Abruzzo
        return "IT-65";
      case "17": // Basilicata
        return "IT-77";
      case "18": // Calabria
        return "IT-78";
      case "15": // Campania
        return "IT-72";
      case "08": // Emilia-Romagna
        return "IT-45";
      case "06": // Friuli Venezia Giulia
        return "IT-36";
      case "12": // Lazio
        return "IT-62";
      case "07": // Liguria
        return "IT-42";
      case "03": // Lombardia
        return "IT-25";
      case "11": // Marche
        return "IT-57";
      case "14": // Molise
        return "IT-67";
      case "21": //	P.A. Bolzano
      case "22": // P.A. Trento
        return "IT-32";
      case "01": // Piemonte
        return "IT-21";
      case "16": // Puglia
        return "IT-75";
      case "20": // Sardegna
        return "IT-88";
      case "19": // Sicilia
        return "IT-82";
      case "09": // Toscana
        return "IT-52";
      case "10": // Umbria
        return "IT-55";
      case "02": // Valle d'Aosta
        return "IT-23";
      case "05": // Veneto
        return "IT-34";
    }
  }

}
