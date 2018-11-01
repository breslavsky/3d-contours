import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

//https://plot.ly/~notebook_demo/84.embed
//https://plot.ly/create/
//https://github.com/plotly/angular-plotly.js/blob/master/README.md

const DATA_LINK = 'https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data = [];
  layout = {
    title: 'Contours projection of surface',
    autosize: true
  };

  constructor(@Inject(HttpClient) private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get(DATA_LINK, {responseType: 'text'})
      .subscribe(csv => this.draw(csv));
  }

  private draw(csv: string) {
    this.data = [
      {
        z: this.parseCSV(csv),
        type: 'surface',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            width: 10,
            project: {z: true}
          },
          x: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: {x: true}
          },
          y: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: {y: true}
          }
        }
      },
    ];
  }

  private parseCSV(csv: string) {
    let rows = csv.split("\n");
    let data = [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i].split(',');
      data.push(row.map(c => c.trim()));
    }
    return data;
  }
}
