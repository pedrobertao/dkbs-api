import { IResourceFactory, ResourceFactory } from "../factory/resource";
import { ITopicFactory, StandardTopicFactory } from "../factory/topic";

export class TopicFactoryProvider {
  private static factories: Map<string, ITopicFactory> = new Map([
    ["standard", new StandardTopicFactory()],
  ]);

  static getFactory(type: string): ITopicFactory {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Factory for type ${type} not found`);
    }
    return factory;
  }
}

export class ResourceFactoryProvider {
  private static factory: IResourceFactory = new ResourceFactory();

  static getFactory(): IResourceFactory {
    return this.factory;
  }
}
