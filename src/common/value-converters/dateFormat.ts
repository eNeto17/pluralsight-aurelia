
import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value: string, format: string) {
    format = !format ? 'MM/DD/YYYY HH:mm' : format;
    return moment(value).format(format);
  }

  fromView(value: string) {
    return new Date(value);
  }
}
