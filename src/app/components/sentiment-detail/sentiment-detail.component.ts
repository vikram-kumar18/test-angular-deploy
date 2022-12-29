import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SentimentDetail } from 'src/app/models/sentiment-detail.model';
import { Sentiment } from 'src/app/models/sentiment.model';
import { StockService } from 'src/app/services/stock.service';
@Component({
  selector: 'app-sentiment-detail',
  templateUrl: './sentiment-detail.component.html',
  styleUrls: ['./sentiment-detail.component.css']
})
export class SentimentDetailComponent implements OnInit {
  stockDetail: SentimentDetail[] = [];
  companyName: string = '';
  constructor(private StockService: StockService, private activatedRoute: ActivatedRoute) {

    let pData: any = this.StockService.getFromLocalStorage('stockList')
    JSON.parse(pData).forEach((element: any) => {
      if (element.name === this.activatedRoute.snapshot.params['symbol']) {
        this.companyName = element.companyName;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['symbol'], 'symbol=====');
    this.getStockInsiderSentiment(this.activatedRoute.snapshot.params['symbol']);
  }

  getStockInsiderSentiment(symbolName: string) {
    this.StockService.getStockInsiderSentiment(symbolName).subscribe((res: Sentiment) => {
      if(res?.data?.length>0)
      this.stockDetail = res.data;
    })
  }

  getMonthName(month: number) {
    let date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('en-US', {
      month: 'long'
    });
  }
}
