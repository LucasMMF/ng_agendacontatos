import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService
  ){
  }

  // Atributo
  grafico: Chart = new Chart();

  ngOnInit(): void {

    this.spinner.show();

    this.dashboardService.get()
      .subscribe({
        next: (data) => {

          var array = [];
          var names = [];
          for(var i = 0; i < data.length; i++) {
            array.push([ data[i].name, data[i].data ]);
            names.push(data[i].name);
          }

          this.grafico = new Chart({
            chart: {
              type: 'bar',
            },
            title: {
              text: 'Quantidade de contatos cadastrados por data'
            },
            subtitle: {
              text: 'Treinamento Angular COTI Informática'
            },
            series: [
              { data: array, type: undefined as any }
            ],
            xAxis: {
              categories: names
            },
            legend: {
              enabled: false
            },
            credits: {
              enabled: false
            }
          });

        },
        error: (e) => {
          console.log(e.error);
        }
      }).add(() => {
        this.spinner.hide();
      });
  }
  
}
