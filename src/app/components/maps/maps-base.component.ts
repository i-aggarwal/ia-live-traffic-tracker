import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import { BaseType, Selection, Path } from 'd3';

export abstract class MapsBaseComponent implements OnInit {
  private width = 1500;
  private height = 625;
  protected svg: Selection<BaseType, {}, HTMLElement, any>;
  protected projections: d3Geo.GeoProjection;
  protected path: d3Geo.GeoPath<any, any>;
  protected baseGroups: Array<Selection<BaseType, {}, HTMLElement, any>>;

  constructor(protected elementRef: ElementRef) {}

  ngOnInit() {
    this.svg = this.initSvg();
    this.projections = this.getProjections();
    this.path = this.getPath();
  }

  protected initSvg() {
    return d3Selection
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }
  protected getProjections(): d3Geo.GeoProjection {
    return d3Geo
      .geoMercator()
      .scale(1)
      .translate([0, 0])
      .precision(0);
  }

  protected getPath(): d3Geo.GeoPath<any, any> {
    return d3Geo.geoPath().projection(this.projections);
  }

  protected adjustScales(data) {
    const bounds = this.path.bounds(data);
    const xScale = this.width / Math.abs(bounds[1][0] - bounds[0][0]);
    const yScale = this.height / Math.abs(bounds[1][1] - bounds[0][1]);
    const scale = xScale < yScale ? xScale : yScale;
    const transl = [
      (this.width - scale * (bounds[1][0] + bounds[0][0])) / 2,
      (this.height - scale * (bounds[1][1] + bounds[0][1])) / 2
    ];
    // TODO: Ishan - Check how this works!

    this.projections
      .scale(scale)
      .translate([
        (this.width - scale * (bounds[1][0] + bounds[0][0])) / 2,
        (this.height - scale * (bounds[1][1] + bounds[0][1])) / 2
      ]);

  }

  abstract loadBaseMap(): void;
}
