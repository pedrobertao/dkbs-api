import { ITopic } from "../../entities/topic";

export abstract class BaseTopic implements ITopic {
  public id: string;
  public name: string;
  public content: string;
  public version: number;
  public parentTopicId?: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: Omit<ITopic, "createdAt" | "updatedAt">) {
    this.id = data.id;
    this.name = data.name;
    this.content = data.content;
    this.version = data.version;
    this.parentTopicId = data.parentTopicId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  abstract getType(): string;
  abstract clone(): BaseTopic;
}

export abstract class TopicComponent {
  abstract getId(): string;
  abstract getName(): string;
  abstract getChildren(): TopicComponent[];
  abstract add(component: TopicComponent): void;
  abstract remove(componentId: string): void;
  abstract find(id: string): TopicComponent | null;
}

export class TopicLeaf extends TopicComponent {
  constructor(private topic: BaseTopic) {
    super();
  }

  getId(): string {
    return this.topic.id;
  }
  getName(): string {
    return this.topic.name;
  }
  getChildren(): TopicComponent[] {
    return [];
  }
  add(): void {
    throw new Error("Cannot add to leaf");
  }
  remove(): void {
    throw new Error("Cannot remove from leaf");
  }

  find(id: string): TopicComponent | null {
    return this.topic.id === id ? this : null;
  }

  getTopic(): BaseTopic {
    return this.topic;
  }
}

export class TopicComposite extends TopicComponent {
  private children: TopicComponent[] = [];

  constructor(private topic: BaseTopic) {
    super();
  }

  getId(): string {
    return this.topic.id;
  }
  getName(): string {
    return this.topic.name;
  }
  getChildren(): TopicComponent[] {
    return this.children;
  }

  add(component: TopicComponent): void {
    this.children.push(component);
  }

  remove(componentId: string): void {
    this.children = this.children.filter(
      (child) => child.getId() !== componentId
    );
  }

  find(id: string): TopicComponent | null {
    if (this.topic.id === id) return this;

    for (const child of this.children) {
      const found = child.find(id);
      if (found) return found;
    }
    return null;
  }

  getTopic(): BaseTopic {
    return this.topic;
  }
}
