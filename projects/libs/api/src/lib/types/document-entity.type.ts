export interface DocumentEntity {
  id: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  updatedAt: {
    nanoseconds: number;
    seconds: number;
  };
}
