export interface Topic {
  id: string;
  name: string;
  content: string;
  version: number;
  parentTopicId?: string;
  createdAt: Date;
  updatedAt: Date;
}
