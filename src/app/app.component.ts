import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/services/company.service';
import { Company } from './models/company';
import { switchMap, tap, map, catchError, filter } from 'rxjs/operators';
import { CsvDataService } from 'src/services/csv-data.service';

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
    CsvDataService.exportToCsv("CompaniesList", this.companiesList$)
  }

}


