import {AfterViewInit, Component} from '@angular/core';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart, ChartDataSets, ChartOptions} from 'chart.js';
import {OperationResponse} from "../../model/OperationResponse";
import {OperationsService} from "../../services/operations.service";

@Component({
  selector: 'app-quantite-graphe',
  templateUrl: './quantite-graphe.component.html',
  styleUrls: ['./quantite-graphe.component.css']
})
export class QuantiteGrapheComponent implements OnInit {
  codeDepot: number = 1;
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  private chart!: Chart;
  yearOptions: number[] = Array.from({length: 31}, (_, i) => 2010 + i);

  constructor(private operationService: OperationsService) { }

  ngOnInit() {
    // Appelez la méthode du service pour récupérer les données des opérations
    this.operationService.getArticleOperations(this.codeDepot, this.month, this.year)
      .subscribe((data: OperationResponse) => {
        const formattedData = this.formatData(data);
        this.generateChart(formattedData);
      });
    this.updateChart();
  }

  formatData(data: OperationResponse): any[] {
    const formattedData = [];
    for (let i = 0; i < data.dates.length; i++) {
      const date = data.dates[i];
      const entries = data.articleEntrees[i];
      const outputs = data.articleSorties[i];

      formattedData.push({ date: date, entries: entries, outputs: outputs });
    }
    return formattedData;
  }

  generateChart(data: any[]) {
    // Vérifiez si les données sont vides
    if (data.length === 0) {
      console.log('Les données sont vides.');
      return;
    }

    // Convertir les données en un tableau d'objets avec les propriétés date, entries et outputs
    const formattedData = data.map(item => {
      const date = item['date'];
      const entries = item['entries'];
      const outputs = item['outputs'];

      return {
        date: date,
        entries: entries,
        outputs: outputs,
      };
    });

    // Créez les tableaux de données pour les opérations d'entrée et de sortie
    const entriesData: number[] = formattedData.map(item => item.entries);
    const outputsData: number[] = formattedData.map(item => item.outputs);

    // Définissez les labels des jours pour l'axe X du graphe
    const labels: string[] = formattedData.map(item => item.date);

    // Définissez les ensembles de données pour les opérations d'entrée et de sortie
    const datasets: ChartDataSets[] = [
      {
        label: 'Opérations d\'entrée',
        data: entriesData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)', // Couleur de remplissage de la courbe d'entrée
        borderColor: 'rgba(0, 123, 255, 1)', // Couleur de bordure de la courbe d'entrée
      },
      {
        label: 'Opérations de sortie',
        data: outputsData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Couleur de remplissage de la courbe de sortie
        borderColor: 'rgba(255, 99, 132, 1)', // Couleur de bordure de la courbe de sortie
      },
    ];

    // Définissez les options du graphe
    const options: any = {
      responsive: true,
      scales: {
        x: {
          display: true, // Afficher les lignes de grille de l'axe X
        },
        y: {
          grid: {
            color: (context: any) => {
              if (context.tick.value === 0) {
                return 'rgba(0, 0, 0, 0.1)'; // Couleur de la ligne de grille de l'axe Y pour la valeur 0
              }
              return 'rgba(0, 0, 0, 0.05)'; // Couleur de la ligne de grille de l'axe Y pour les autres valeurs
            },
          },
        },
      },
    };

// Créez une instance du graphe
    this.chart = new Chart('myChart1', {
      type: 'bar', // Utilisez le type 'line' pour un graphe en courbes
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: options,
    });
  }
  updateChart() {
    this.operationService.getArticleOperations(this.codeDepot, this.month, this.year)
      .subscribe((data: OperationResponse) => {
        const formattedData = this.formatData(data);
        this.generateChart(formattedData);
      });
  }

}
