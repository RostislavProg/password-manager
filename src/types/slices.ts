interface Account {
  id: string;
  login: string;
  password: string;
}
  
interface UserContent {
  id: string;
  service: string;
  log: string;
  pass: string;
}

export interface AuthState {
  userId: string;
  accounts: Account[];
  accountsContent: { userContent: UserContent[], id: string }[];
}

export interface EditState {
  editMode: boolean;
  selectedUnitId: string;
}