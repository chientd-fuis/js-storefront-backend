export interface UserType {
  user_id: number;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserTypeInformation {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface UserTypeRequest {
  first_name: string;
  last_name: string;
  password: string;
}

export interface UserTypeAuth {
  user_id: number;
  token: string;
}

export interface UserTypeAccount {
  user_id: number;
  password: string;
}
