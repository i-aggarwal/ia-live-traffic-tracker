import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLiveTraffic } from '../../store/actions';
import { RouteConfig, VehicleLocation, Route } from '../../services/models/live-traffic.models';
import * as d3Selection from 'd3-selection';
import { GeojsonService } from '../../../geographies/services/geojson.service';
import { Places } from '../../../geographies/services/models/places.models';
import * as d3Geo from 'd3-geo';
import { Observable } from 'rxjs/Observable';
import { BaseType, Selection } from 'd3';
import * as fromLiveTrafficReducer from '../../store/reducers';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-traffic-mapper',
  templateUrl: './traffic-mapper.component.html',
  styleUrls: ['./traffic-mapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficMapperComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() agency = 'sf-muni';
  @Input() route: string;
  @Input() place: Places;
  @Input() routeConfig: { [key: string]: RouteConfig };
  @Input() routeDetails: Array<Route>;

  @Output() selectedRoute = new EventEmitter<string>();

  private projections: d3Geo.GeoProjection;
  private svg: Selection<BaseType, {}, HTMLElement, any>;
  private vehicleLocation$: Observable<Array<VehicleLocation>>;
  private form: FormGroup;
  private routeTags: Array<string>;

  constructor(private store: Store<any>, private _fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    this.projections = this.projections || GeojsonService.getProjections(this.place);
    if (
      changes.routeConfig &&
      !changes.routeConfig.isFirstChange() &&
      changes.routeConfig.currentValue &&
      changes.routeConfig.currentValue !== changes.routeConfig.previousValue
    ) {
      this.drawRoutes();
    }
  }

  ngOnInit() {
    this.projections = GeojsonService.getProjections(this.place);
    this.form = this._fb.group({
      route: ['']
    });

    this.form.valueChanges.subscribe(newFormValue => {
      return this.selectedRoute.emit(newFormValue.route);
    });
  }

  ngAfterViewInit(): void {
    this.svg = d3Selection.select('svg');
  }

  drawRoutes() {
    // getVehileLocationForRoute
    if (this.routeConfig) {
      const routeGroupSelection = this.svg.select('g#routesGroup');
      if (!routeGroupSelection.empty()) {
        routeGroupSelection.remove();
      }
      const containerGroup = this.svg.append('g').attr('id', 'routesGroup');
      Object.keys(this.routeConfig).forEach((tag: string) => {
        const route = this.routeConfig[tag];
        if (route) {
          const selection = containerGroup.select('g#route_' + route.tag);
          if (!selection.empty()) {
            selection.remove();
          }
          const allPaths = route.path;
          const svgGroup = containerGroup.append('g').attr('id', 'route_' + route.tag);

          allPaths.forEach((path, index) => {
            const links = [];
            const pairs$ = Observable.from(path.point)
              .pairwise()
              .subscribe(pairs => {
                links.push([
                  this.projections([pairs[0].lon, pairs[0].lat]),
                  this.projections([pairs[1].lon, pairs[1].lat])
                ]);
              });
            svgGroup
              .selectAll('.lineConnect_' + route.tag + '_' + index)
              .data(links)
              .enter()
              .append('line')
              .style('stroke', '#' + route.color)
              .style('stroke-width', '1px')
              .attr('x1', function(d) {
                return d[0][0];
              })
              .attr('y1', function(d) {
                return d[0][1];
              })
              .attr('x2', function(d) {
                return d[1][0];
              })
              .attr('y2', function(d) {
                return d[1][1];
              });
          });

          const vehicleLocation$ = this.store.select(
            fromLiveTrafficReducer.getVehileLocationForRoute(this.agency, tag)
          );
          vehicleLocation$.subscribe((vehicleLocations: Array<VehicleLocation>) => {
            if (vehicleLocations) {
              const locations = Array.isArray(vehicleLocations) ? vehicleLocations : [vehicleLocations];
              const predictableVehicles = locations.filter(vehicle => vehicle.predictable === 'true');
              this.drawVehicles(predictableVehicles, route.color, route.oppositeColor, tag, svgGroup);
            }
          });
        }
      });
    }
  }
  drawVehicles(
    vehicleLocations: Array<VehicleLocation>,
    color: string,
    oppositeColor: string,
    routeTag: string,
    routeGroup: Selection<BaseType, {}, HTMLElement, any>
  ) {
    routeGroup
      .selectAll('.primaryCircleGroup_' + routeTag)
      .data([])
      .exit()
      .remove();
    const circleSelection = routeGroup.selectAll('circle#primaryCircleGroup_circle_' + routeTag);
    if (!circleSelection.empty()) {
      circleSelection.remove();
    }
    const selection = routeGroup.selectAll('g#primaryCircleGroup_' + routeTag);
    if (!selection.empty()) {
      selection.remove();
    }
    const primaryCircleGroup = routeGroup
      .selectAll('.primaryCircleGroup_' + routeTag)
      .data(vehicleLocations, (d: VehicleLocation) => {
        return d.id;
      })
      .enter()
      .append('g')
      .attr('id', 'primaryCircleGroup_' + routeTag)
      .attr('transform', (d: VehicleLocation) => {
        return 'translate(' + this.projections([d.lon, d.lat]) + ')';
      });

    primaryCircleGroup
      .append('circle')
      .attr('id', 'primaryCircleGroup_circle_' + routeTag)
      .attr('r', '6')
      .style('fill', color)
      .style('stroke', oppositeColor)
      .style('stroke-width', '1px');

    primaryCircleGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '6')
      .style('stroke-width', '1px')
      .style('fill', color)
      .style('stroke', oppositeColor)
      .text(function(d) {
        return d.routeTag;
      });

    // TODO: ishan - If get time, add direction
    // const directionGroup = primaryCircleGroup.append('g').style('transform-origin', 'center center');
    // const direction = directionGroup
    //   .append('path')
    //   .style('transform-origin', 'center center')
    //   .attr('class', 'drop-group')
    //   .attr('fill', 'black')
    //   .attr('transform', (d: VehicleLocation) => {

    //   });
  }
}
