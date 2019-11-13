import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-email-sender-component',
  templateUrl: './email-sender.component.html'
})
export class EmailSenderComponent {
  public headers: String[];
  public rows: EventRow[];
  public sumRow: String[];
  public success: String[];

  constructor(router: Router, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      console.log(router.parseUrl(router.url).toString());
    var url = router.parseUrl(router.url).toString().split('/');
    var startDate = url[2];

    var email = "grzeg.kunc@gmail.com";
    var startYear = startDate.substring(0,4);
    var startMonth = startDate[5] == '0' ? startDate[6] : startDate.substring(5,7);
    var startDay = startDate[8] == '0' ? startDate[9] : startDate.substring(8,10);

    console.log(startDay + startMonth + startYear);

    http.get<String[]>(baseUrl + 'createheaders?day=' + startDay +
                                 '&month=' + startMonth +
                                 '&year=' + startYear)
    .subscribe(result => {
      this.headers = result;
    }, error => console.error(error));

    http.get<EventRow[]>(baseUrl + 'createeventtitles?day=' + startDay +
                                 '&month=' + startMonth +
                                 '&year=' + startYear)
    .subscribe(result => {
        this.rows = result;
    }, error => console.error(error));

    http.get<String[]>(baseUrl + 'sumrow?day=' + startDay +
                                 '&month=' + startMonth +
                                 '&year=' + startYear)
    .subscribe(result => {
        this.sumRow = result;
    }, error => console.error(error));

    http.get<string[]>(baseUrl + 'sendemail?email='+ email +
                                 '&day=' + startDay +
                                 '&month=' + startMonth +
                                 '&year=' + startYear)
    .subscribe(result => {
        this.success = result;
    }, error => console.error(error));

  }

    
  

  ngAfterViewChecked(){
    this.addtfoot("summary", [1,2,3,4,5,6,7,8], 3);
  }

   public addtfoot(tblname,cols,size){
  	var colArray = new Array(size);
  	$.each(cols,function(i,v){
  		let sum = 0;
  		let j = 1;
  		$("[id='"+tblname+"'] tbody tr ").each(function(index, value){
  			sum = sum + +($(value).find("td:eq("+v+")").text());
  			j++;
  		});
  			colArray[v] = sum;
  	});
  	
  	var HTMLstr = "<tfoot><tr style='background-color: yellow; font-weight: bold;'><td style='text-align: center'>SUMA:</td>";
  	$.each(colArray,function(i,v){
      if(v==null){ return; };
      HTMLstr = HTMLstr + "<td style='text-align: center;'>" + v + "</td>";
  	});
  	HTMLstr = HTMLstr + "</tr></tfoot>";
  	$("[id='"+tblname+"'] tfoot").remove();
  	$("[id='"+tblname+"'] ").append(HTMLstr);
  	
  }
    // create http request to generate Sum row
}

interface EventRow {
  title: string;
  dates: string[];
}
