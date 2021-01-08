import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'List All Countries';
  countryList: any = [];
  searchFilter: any;
  orgCountryList: any = [];
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit() {
    this.searchFilter ={
      name: '',
      currencyName: '',
      operators: ['>', '<', '='],
      areaOperator: '>',
      area: 0,
      populationOperator: '>',
      population: 0
    };
    this.getCountryList();
  }

  getCountryList() {
    this.httpClient.get("assets/allcountries.json").subscribe((data: any) => {
      data.forEach(grp => {
        grp.currencyName = grp.currencies.map(function(elem){
          return elem.name;
          }).join(",")
      });
      console.log(data);
      this.countryList = data;
      this.orgCountryList = JSON.parse(JSON.stringify(data));
    })
  }

  sortAlphaNum(ary, prop, sortIn) {
    if(sortIn) {
      ary.sort((a, b) => (a[prop] > b[prop]) ? 1 : -1);
    } else {
      ary.sort((a, b) => (b[prop] > a[prop]) ? 1 : -1);
    }
  }

  searchBy() {
    this.countryList = this.orgCountryList;
    if(this.searchFilter && this.searchFilter.name) {
      this.countryList = this.orgCountryList.filter((item) => { return item.name.toLowerCase().includes(this.searchFilter.name.toLowerCase()) });     
    } 
    if(this.searchFilter && this.searchFilter.currencyName) {
      this.countryList = this.orgCountryList.filter((item) => { return item.currencyName.toLowerCase().includes(this.searchFilter.currencyName.toLowerCase()) });     
    } 
    if(this.searchFilter && this.searchFilter.area) {
      if(this.searchFilter.areaOperator === '>') {
        this.countryList = this.countryList.filter((areas) => { return areas.area > this.searchFilter.area });   
      } else if(this.searchFilter.areaOperator === '<')  {
        this.countryList = this.countryList.filter((areas) => { return areas.area < this.searchFilter.area }); 
      } else if(this.searchFilter.areaOperator === '=')  {
        this.countryList = this.countryList.filter((areas) => { return areas.area = this.searchFilter.area }); 
      }
    }
    if(this.searchFilter && this.searchFilter.population) {
      if(this.searchFilter.populationOperator === '>') {
        this.countryList = this.countryList.filter((populations) => { return populations.population > this.searchFilter.population });   
      } else if(this.searchFilter.populationOperator === '<')  {
        this.countryList = this.countryList.filter((populations) => { return populations.population < this.searchFilter.population }); 
      } else if(this.searchFilter.populationOperator === '=')  {
        this.countryList = this.countryList.filter((populations) => { return populations.population = this.searchFilter.population }); 
      }
    }

  }
}
