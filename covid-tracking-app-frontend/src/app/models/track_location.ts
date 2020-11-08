export interface TrackLocation {
    lattitude: number;
    longitude: number;
  }
  
  export interface TrackLocationResponse {
    message: String;
    track_location: TrackLocation;
  }
  
  export interface TrackLocationsResponse {
    message: String;
    track_locations: TrackLocation[];
  }