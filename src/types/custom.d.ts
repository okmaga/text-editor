export interface Note {
  _id: string;
  userId?: string;
  title: string;
  body: string;
  timestamp?: string;
}

export interface User {
  _id: string;
  name?: string;
  email: string;
}
