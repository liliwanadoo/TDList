import { Pipe, PipeTransform } from '@angular/core';

// Import the whole moment package from node_modules/moment
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // Fake current date
    const birthDate: moment.Moment = moment();

    let unit = ' an(s) avant l\'échéance';

    let format: moment.unitOfTime.Diff = 'year';

    // What's args...
    if (args) {
      format = args[0];
    }

    // Convert string date in Moment date (value <=> user.birthDate for example)
    const today: moment.Moment = moment(value);

    // Get difference between two dates with moment
    let theAge: number = today.diff(birthDate, 'year');
    if (theAge < 1) {
      theAge = today.diff(birthDate, 'month');
      unit = ' mois avant l\'échéance';
      if (theAge < 1) {
        theAge = today.diff(birthDate, 'day');
        unit = ' jour(s) avant l\'échéance';
        if (theAge === 0) {
          unit = 'C\'est le jour de l\'échéance';
          return unit;
        }
        if (theAge < 0) {
          unit = ' jour(s) sont passés depuis l\'échéance. Peut-être avez-vous déjà rempli la mission mais vous avez omis de la supprimer?';
          theAge = theAge * -1;
        }
      }
    }
    return theAge + unit;
  }

}
