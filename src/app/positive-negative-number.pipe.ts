import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'positiveNegativeNumber'})
export class PositiveNegativeNumberPipe implements PipeTransform {
  transform(value: string): string {
    return value[0] !== "-" ? "+" + value : value;
  }
}
