export interface Location {
    location_id: number;
    lattitude: number;
    longitude: number;
    closest_address_id?: number;
  }
  
  export interface LocationResponse {
    message: String;
    location: Location;
  }
  
  export interface LocationsResponse {
    message: String;
    locations: Location[];
  }