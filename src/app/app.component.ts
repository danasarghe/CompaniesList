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
  companies$: Observable<Company[]>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this.companyService.readAllCompanyDetails().pipe(map((result) => result.flat()),
      filter((companies) => companies.every((company) => company.companyName)));
  }

}


