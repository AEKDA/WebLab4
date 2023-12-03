import { Component, OnInit } from '@angular/core';
import { GraphService } from '../service/graph.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit{
  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.initializeCanvas("canvas");
  }

  onCanvasClick(event: MouseEvent): void {
    this.graphService.handleCanvasClick(event);
  }
}
