import { ITopic, Topic } from "../../entities/topic";
import { BaseTopic } from "../composite/topic";

export interface ITopicFactory {
  createTopic(data: Omit<ITopic, "createdAt" | "updatedAt">): BaseTopic;
}

export class StandardTopicFactory implements ITopicFactory {
  createTopic(data: Omit<ITopic, "createdAt" | "updatedAt">): BaseTopic {
    return new Topic(data);
  }
}
