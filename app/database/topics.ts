import { ITopic } from "../entities/topic";
import { BaseTopic } from "../patterns/composite/topic";
import { StandardTopicFactory, ITopicFactory } from "../patterns/factory/topic";

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

export class TopicVersionControl {
  private versions: Map<string, Map<number, BaseTopic>> = new Map();
  private latestVersions: Map<string, number> = new Map();

  createVersion(
    topicId: string,
    topicData: Omit<ITopic, "createdAt" | "updatedAt">
  ): BaseTopic {
    const factory = TopicFactoryProvider.getFactory("standard");

    if (!this.versions.has(topicId)) {
      this.versions.set(topicId, new Map());
      this.latestVersions.set(topicId, 0);
    }

    const currentVersion = this.latestVersions.get(topicId) || 0;
    const newVersion = currentVersion + 1;

    const newTopic = factory.createTopic({
      ...topicData,
      version: newVersion,
    });

    this.versions.get(topicId)!.set(newVersion, newTopic);
    this.latestVersions.set(topicId, newVersion);

    return newTopic;
  }

  getVersion(topicId: string, version: number): BaseTopic | null {
    const topicVersions = this.versions.get(topicId);
    return topicVersions?.get(version) || null;
  }

  getLatestVersion(topicId: string): BaseTopic | null {
    const latestVersion = this.latestVersions.get(topicId);
    if (!latestVersion) return null;
    return this.getVersion(topicId, latestVersion);
  }

  getAllVersions(topicId: string): BaseTopic[] {
    const topicVersions = this.versions.get(topicId);
    return topicVersions ? Array.from(topicVersions.values()) : [];
  }

  getVersionHistory(topicId: string): number[] {
    const topicVersions = this.versions.get(topicId);
    return topicVersions ? Array.from(topicVersions.keys()).sort() : [];
  }
}
