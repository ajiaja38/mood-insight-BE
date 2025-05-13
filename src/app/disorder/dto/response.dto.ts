export interface IDetailDisorder {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  solutions: {
    id: string;
    solution: string;
  }[];
}
