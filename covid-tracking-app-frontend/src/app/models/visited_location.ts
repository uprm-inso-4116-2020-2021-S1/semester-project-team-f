export interface VisitedLocation {
    user_id: string;
    location_id: number;
    date_visited: Date;
  }
  
  export interface VisitedLocationResponse {
    message: String;
    visited_location: VisitedLocation;
  }
  
  export interface VisitedLocationsResponse {
    message: String;
    visited_locations: VisitedLocation[];
  }