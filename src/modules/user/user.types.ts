export interface UserName {
  firstName: string;
  lastName: string;
}

export interface User extends UserName {
  email: string;
  password: string;
}

export interface UserProfile {
  email: string;
  fullname: string;
}
