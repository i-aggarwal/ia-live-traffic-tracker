export interface Agency {
  title: string;
  regionTitle: string;
  tag: string;
  copyright: string;
}

export interface AgencyListApiResponse {
  agency: Array<Agency>;
}

export interface Route {
  title: string;
  tag: string;
  copyright: string;
}
export interface RouteListApiResponse {
  route: Array<Route>;
}

export interface Stop {
  title: string;
  stopId: string;
  tag: string;
  lon: string;
  lat: string;
}

export interface Point {
  lon: number;
  lat: number;
}

export interface Path {
  point: Array<Point>;
}

export interface Direction {
  stop: Array<{
    tag: string;
  }>;
  title: string;
  useForUI: string;
  tag: string;
  name: string;
}

export interface RouteConfig {
  lonMax: string;
  latMax: string;
  lonMin: string;
  latMin: string;
  stop: Array<Stop>;
  title: string;
  color: string;
  direction: Array<Direction>;
  tag: string;
  path: Array<Path>;
  oppositeColor: string;
  copyright: string;
}

export interface RouteConfigApiResponse {
  route?: RouteConfig | Array<RouteConfig>;
}

export interface VehicleLocation {
  id: string;
  lon: number;
  lat: number;
  routeTag: string;
  predictable: string;
  speedKmHr: string;
  dirTag: string;
  leadingVehicleId: string;
  heading: string;
  secsSinceReport: string;
  lastTime: Object;
  copyright: string;
}

export interface VehicleLocationApiResponse {
  vehicle: Array<VehicleLocation>;
}
