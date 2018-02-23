import { OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';
import { GeojsonService } from '../../geographies/services/geojson.service';
import { Places } from '../../geographies/services/models/places.models';

export abstract class MapsBaseComponent implements AfterViewInit, OnInit {
  protected svg: Selection<BaseType, {}, HTMLElement, any>;
  protected projections: d3Geo.GeoProjection;
  protected path: d3Geo.GeoPath<any, any>;
  protected baseGroups: Array<Selection<BaseType, {}, HTMLElement, any>>;

  @Input() place: Places;

  @ViewChild('svgContainer') svgContainer: ElementRef;

  constructor(protected elementRef: ElementRef) {}

  ngOnInit() {
    GeojsonService.setProjections(this.place);
    GeojsonService.setPath(this.place);
    this.projections = GeojsonService.getProjections(this.place);
    this.path = GeojsonService.getPath(this.place);
  }
  ngAfterViewInit() {
    this.svg = this.initSvg();
  }

  protected initSvg() {

    const container: HTMLElement = this.svgContainer.nativeElement;
    return d3Selection
      .select(container)
      .append('svg')
      .attr('width', GeojsonService.cityMap['SFO'].width)
      .attr('height', GeojsonService.cityMap['SFO'].height);
  }
  abstract loadBaseMap(): void;
}
