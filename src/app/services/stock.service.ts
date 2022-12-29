import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, observable} from 'rxjs'
import { QuoteData } from '../models/quote-data.model';
import { StockSearch } from '../models/stock-search.model';
import { Sentiment } from '../models/sentiment.model';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  token:string='bu4f8kn48v6uehqi3cqg';
  constructor(private http: HttpClient) { }

  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }

  setToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getCompanyName(stockName:string): Observable<StockSearch>{
    
    return this.http.get<StockSearch>('https://finnhub.io/api/v1/search?q='+stockName + '&token='+this.token);
  }

  getStockQuotedData(stockName:string): Observable<QuoteData>{
   return this.http.get<QuoteData>('https://finnhub.io/api/v1/quote?symbol='+stockName + '&token='+this.token);
  }

  getStockInsiderSentiment(symbolName:string): Observable<Sentiment>{
    const todayDate = new Date().toISOString().slice(0, 10);
    const fromDateFormat = new Date(todayDate);
    fromDateFormat.setMonth(fromDateFormat.getMonth() - 3);
    const fromDate = fromDateFormat.toISOString().slice(0, 10);
    
    return this.http.get<Sentiment>('https://finnhub.io/api/v1/stock/insider-sentiment?symbol='+symbolName+ '&from='+fromDate+'&to='+todayDate+'&token='+this.token);
   }
}
