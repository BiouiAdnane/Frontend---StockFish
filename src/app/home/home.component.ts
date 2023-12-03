import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DepotService} from "../services/depot-service";
import { Chart, ChartScales, LinearScale } from 'chart.js';
import {Dataset} from "../model/Dataset";
import {UtilisateurService} from "../services/utilisateur.service";
import { interval } from 'rxjs';
import {ArticleService} from "../services/article.service";
import {FamilleService} from "../services/famille.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('barChart') private barChartRef!: ElementRef;
  private barChart!: Chart;
  nombreUtilisateurs: number = 0;
  nombreArticle:number=0;
  nombreFamille:number=0;

  private chart!: Chart;

  constructor(private depotService: DepotService, private utilisateurService:UtilisateurService,
              private articleService:ArticleService , private familleService:FamilleService) { }

  ngOnInit() {
    this.GrapheDepot();

    this.utilisateurService.countPersonne().subscribe(
      count => {
        const finalUserCount = count;
        const updateInterval = 100; // 100ms = 0.1 seconde (ajustez selon vos besoins)

        const incrementUserCount = () => {
          if (this.nombreUtilisateurs < finalUserCount) {
            this.nombreUtilisateurs++;
            setTimeout(incrementUserCount, updateInterval);
          }
        };

        incrementUserCount();
      },
      error => {
        console.error('Une erreur s\'est produite lors du comptage des utilisateurs : ', error);
      }
    );

    this.articleService.countArticles().subscribe(
      count => {
        const finalUserCount = count;
        const updateInterval = 100; // 100ms = 0.1 seconde (ajustez selon vos besoins)

        const incrementUserCount = () => {
          if (this.nombreArticle < finalUserCount) {
            this.nombreArticle++;
            setTimeout(incrementUserCount, updateInterval);
          }
        };

        incrementUserCount();
      },
      error => {
        console.error('Une erreur s\'est produite lors du comptage des utilisateurs : ', error);
      }
    );


    this.familleService.countFamille().subscribe(
      count => {
        const finalUserCount = count;
        const updateInterval = 100; // 100ms = 0.1 seconde (ajustez selon vos besoins)

        const incrementUserCount = () => {
          if (this.nombreFamille < finalUserCount) {
            this.nombreFamille++;
            setTimeout(incrementUserCount, updateInterval);
          }
        };

        incrementUserCount();
      },
      error => {
        console.error('Une erreur s\'est produite lors du comptage des utilisateurs : ', error);
      }
    );
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
              callback: function(value: number, index: number, values: number[]) {
                return value + '%';
              }
            }
          }
        } as ChartScales
      }
    });
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }


}
















































/*CountPersonne() {
  this.utilisateurService.countPersonne().subscribe(
    count => {
      this.personneCount = count;
      this.createChart();
    },
    error => {
      console.error('Une erreur s\'est produite lors du comptage des personnes : ', error);
    }
  );
}
this.CountPersonne();
createChart() {
      const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx )
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Utilisateurs'],
          datasets: [{
            label: 'Nombre de personnes',
            data: [this.personneCount],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)'
          }]
        },
        options: {
          responsive: true
        }
      });
    }*/


