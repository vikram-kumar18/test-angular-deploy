import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuoteData } from 'src/app/models/quote-data.model';
import { StockList } from 'src/app/models/stock-list.model';
import { StockSearch } from 'src/app/models/stock-search.model';
import { StockService } from 'src/app/services/stock.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  name:string = '';
  stockList:StockList[] = [];
  comapnyName:string = '';
  constructor(private StockService : StockService, private spinner: NgxSpinnerService){
    let pData = this.StockService.getFromLocalStorage('stockList');
    if(pData)
    this.stockList = JSON.parse(pData);
  }

  trackStock(){
    this.spinner.show();
    this.StockService.getCompanyName(this.name).subscribe((data:StockSearch) => {
      if(data.result.length>0){
        let comapnyName = data.result[0].description;
        this.getStockQuotedData(comapnyName);
      }
    })


  }

  getStockQuotedData(comapnyName:string){
    this.StockService.getStockQuotedData(this.name).subscribe((data:QuoteData) => {
      let obj = {
        companyName : comapnyName,
        changeToday : data.d,
        openingPrice : data.o,
        curentPrice : data.c,
        highPrice  : data.h,
        name: this.name
      }
      this.stockList.push(obj)
      this.StockService.setToLocalStorage('stockList', JSON.stringify(this.stockList));;
      this.name='';
      this.spinner.hide();
    })
  }

  removeStock(index:number){
    this.stockList.splice(index,1);
    this.StockService.setToLocalStorage('stockList', JSON.stringify(this.stockList))
  }
}
