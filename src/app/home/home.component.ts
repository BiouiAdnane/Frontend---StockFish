import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DepotService} from "../services/depot-service";
import Chart from 'chart.js/auto';
import {Dataset} from "../model/Dataset";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('barChart') private barChartRef!: ElementRef;
  private barChart!: Chart;

  constructor(private depotService: DepotService) { }

  ngOnInit() {
    this.GrapheDepot();

  }

  GrapheDepot(){
    const code_Depots = [1, 2]; // Exemples de codes de dépôts
    const labels = ['Depot Emballage', 'Depot Produit Fini'];

    const datasets: Dataset[] = [];

    for (const [index, code_Depot] of code_Depots.entries()) {
      const label = labels[index];

      this.depotService.getDepot(code_Depot).subscribe((depot) => {
        const percentage = (depot.quantiteActuelle / depot.qauntiteMax) * 100;
        const backgroundColor = index === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(54, 162, 235, 0.2)';
        const borderColor = index === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(54, 162, 235, 1)';
        const dataset: Dataset = {
          label: label,
          data: [percentage],
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        };
        datasets.push(dataset);

        if (datasets.length === code_Depots.length) {
          this.renderChart(datasets);
        }
      });
    }
  }
  renderChart(datasets: Dataset[]) {
    const barChartData = {
      labels: ['Quantité actuelle'],
      datasets: datasets
    };

    this.barChart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value, index, values) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }


}




