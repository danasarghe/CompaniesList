import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/services/company.service';
import { Company } from './models/company';
import { switchMap, tap, map, catchError, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  companiesList$: Observable<Company[]>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companiesList$ = this.companyService.readAllCompanyDetails().pipe(map((result) => result.flat()),
      map((data) => {
        data.sort((a, b) => {
          return a.companyName < b.companyName ? -1 : 1;
        });
        return data;
      }));
  }

  downloadCSVButton() {
    var csvData = this.ConvertToCSV(this.companiesList$);
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = 'ETPHoldReview.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  ConvertToCSV(objArray: any): string {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var row = "";

    for (var index in objArray[0]) {
      row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  }
}


