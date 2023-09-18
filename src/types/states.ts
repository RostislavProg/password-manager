export interface AuthState {
  login: string;
  password: string;
  error: string;
}

export interface RegState {
  login: string;
  password: string;
  repPassword: string; 
  error: string;
}

export interface FormsState {
  service?: string;
  log: string;
  pass: string;
  error: string;
}