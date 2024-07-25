import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NewsletterResponse } from '../interface/newsletter';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private endpointUrl = 'http://localhost:3000/subscribers';

  constructor(private http: HttpClient) { }

  sendData(name: string, email: string): Observable<NewsletterResponse>{
    const data = {name, email};

    return this.http.post<NewsletterResponse>(this.endpointUrl, data);
  }
}
