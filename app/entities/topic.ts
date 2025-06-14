import { BaseTopic } from "../patterns/composite/topic";
import { IResource } from "./resource";
// Concrete Topic implementation

// Base Topic Inteface
export interface ITopic {
  id: string;
  name: string;
  content: string;
  version: number;
  parentTopicId?: string;
  createdAt: Date;
  updatedAt: Date;
}
// Base Topic Tree
export interface ITopicTree {
  topic: ITopic;
  resources: IResource[];
  children: ITopicTree[];
}

export class Topic extends BaseTopic {
  clone(): Topic {
    return new Topic({
      id: this.id,
      name: this.name,
      content: this.content,
      version: this.version,
      parentTopicId: this.parentTopicId,
    });
  }

  getType(): string {
    return "standard";
  }
}
