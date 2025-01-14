import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailData {
  name: string;
  email: string;
  message: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api/send-email';

  constructor(private http: HttpClient) { }

  sendEmail(data: EmailData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
