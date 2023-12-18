export interface Note {
  id: string;
  userId: string;
  title: string;
  body: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
