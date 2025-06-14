import { ITopic } from "./topic";

// Base Resource Types
export enum ResourceType {
  VIDEO = "video",
  ARTICLE = "article",
  PDF = "pdf",
  DOCUMENT = "document",
  WEBSITE = "website",
  IMAGE = "image",
}

// Base Resource interface
export interface IResource {
  id: string;
  topicId: string;
  url: string;
  description: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
}

// Topic hierarchy structure with resources
export interface ITopicTree {
  topic: ITopic;
  resources: IResource[];
  children: ITopicTree[];
}
