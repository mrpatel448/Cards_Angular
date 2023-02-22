import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  baseUrl = 'https://localhost:7206/api/cards';

  constructor(private http: HttpClient) { }

  // Get all cards
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl);
  }

  addCard(obj: Card) {
    return this.http.post<Card>(this.baseUrl, obj);
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(this.baseUrl + '/' + id);
  }

  updateCard(obj: Card): Observable<Card> {
    return this.http.put<Card>(this.baseUrl + '/' + obj.id, obj);
  }

  deleteCard(id: number): Observable<Card> {
    return this.http.delete<Card>(this.baseUrl + '/' + id);
  }
}
