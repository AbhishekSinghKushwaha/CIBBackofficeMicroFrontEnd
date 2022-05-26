import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionApprovalSearch'
})
export class TransactionApprovalSearchPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;
    return value.filter(
      (v: any) =>
        v.text.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }

}
