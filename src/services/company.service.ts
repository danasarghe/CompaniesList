import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public readAllCompanyDetails(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiUrl}/company/getall`)
  }
}
