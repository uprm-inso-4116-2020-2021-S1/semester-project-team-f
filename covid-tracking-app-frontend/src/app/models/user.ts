export interface User {
    user_id?: string;
    gender_id: number;
    address_id?: number;
    full_name: string;
    birthdate: Date;
    phone_number: string;
    email: string;
    password: string;
    active: boolean;
  }
  
  export interface UserResponse {
    message: String;
    user: User;
  }
  
  export interface UsersResponse {
    message: String;
    users: User[];
  }