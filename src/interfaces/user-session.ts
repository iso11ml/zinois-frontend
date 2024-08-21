export interface Account {
    id: string;
    name: string;
    lastName: string;
    email: string;
    createdAt: string;
}
  
export interface UserSession {
    account: Account;
    token: string;
}
  