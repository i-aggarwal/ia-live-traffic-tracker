import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  private width = 1500;
  private height = 625;
  private svg: Selection<BaseType, {}, HTMLElement, any>;
  private projections: d3Geo.GeoProjection;
  private path: d3Geo.GeoPath<any, any>;
  private group: Selection<BaseType, {}, HTMLElement, any>;
  private geoJson = require('./assets/geoJsons/freeways.json');
  private features: Array<Object> = [];

  constructor(private elementRef: ElementRef) {
    const geoJsonPaths = [
      './assets/geoJsons/arteries.json',
      './assets/geoJsons/freeways.json',
      './assets/geoJsons/neighborhoods.json',
      './assets/geoJsons/streets.json'
    ];

    const jsonA = require('./assets/geoJsons/arteries.json');
    const jsonF = require('./assets/geoJsons/freeways.json');
    const jsonN = require('./assets/geoJsons/neighborhoods.json');
    const jsonS = require('./assets/geoJsons/streets.json');

    const usStates = require('./assets/geoJsons/us-states.json');
    const sfo = require('./assets/geoJsons/us-states.json');

    // this.features = this.features
    //   .concat(jsonA.features)
    //   .concat(jsonF.features)
    //   .concat(jsonN.features)
    //   .concat(jsonS.features);

    this.features = usStates.features;
  }

  ngAfterViewInit() {
    this.svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.group = this.svg.append('g').style('stroke-width', '1.5px');

    this.renderMap();
  }

  private renderMap() {
    this.projections = d3Geo
      .geoMercator()
      .translate([this.width / 2, this.height / 2])
      .scale(this.width / (2 * Math.PI))
      .center([-122.431297, 37.773972]);

    this.path = d3Geo.geoPath().projection(this.projections);

    this.group
      .selectAll('path')
      .data(this.features)
      .enter()
      .append('path')
      .attr('d', this.path);
  }
}
