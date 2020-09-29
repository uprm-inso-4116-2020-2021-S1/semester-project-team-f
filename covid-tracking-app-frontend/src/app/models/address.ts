export interface Address {
    address_id?: number;
    country_name: string;
    region_name: string;
    street_address: string;
    city_name: string;
    zip_code: string;
  }
  
  export interface AddressResponse {
    message: String;
    address: Address;
  }
  
  export interface AddressesResponse {
    message: String;
    addresses: Address[];
  }