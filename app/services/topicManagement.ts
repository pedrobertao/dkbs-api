import { IResource } from "../entities/resource";
import { ITopic, ITopicTree } from "../entities/topic";
import { IUser } from "../entities/user";
import { PermissionContext } from "../patterns/composite/permission";
import { BaseResource } from "../patterns/composite/resource";
import { BaseTopic } from "../patterns/composite/topic";
import { CustomPathfinder } from "./pathFinder";
import { ResourceManagement } from "./resourceManagement";
import { TopicVersionControl } from "./topicVersionControl";

export class TopicManagementService {
  private versionControl = new TopicVersionControl();
  private resourceManagement = new ResourceManagement();
  private permissionContext: PermissionContext;

  constructor(private user: IUser) {
    this.permissionContext = new PermissionContext(user);
  }

  // Create or update topic (creates new version)
  createOrUpdateTopic(
    topicData: Omit<ITopic, "createdAt" | "updatedAt" | "version">
  ): BaseTopic {
    if (!this.permissionContext.canWrite(this.user, {} as ITopic)) {
      throw new Error("Permission denied: Cannot write topics");
    }

    return this.versionControl.createVersion(topicData.id, {
      ...topicData,
      version: 1, // Will be overridden by version control
    });
  }

  // Get specific version of topic
  getTopic(topicId: string, version?: number): BaseTopic | null {
    const topic = version
      ? this.versionControl.getVersion(topicId, version)
      : this.versionControl.getLatestVersion(topicId);

    if (!topic) return null;

    if (!this.permissionContext.canRead(this.user, topic)) {
      throw new Error("Permission denied: Cannot read this topic");
    }

    return topic;
  }

  // Resource management methods
  createResource(
    resourceData: Omit<IResource, "createdAt" | "updatedAt">
  ): BaseResource {
    // Check if user can manage resources for the topic
    const topic = this.getTopic(resourceData.topicId);
    if (!topic) {
      throw new Error("Topic not found");
    }

    if (!this.permissionContext.canManageResources(this.user, topic)) {
      throw new Error(
        "Permission denied: Cannot manage resources for this topic"
      );
    }

    return this.resourceManagement.createResource(resourceData);
  }

  getResource(resourceId: string): BaseResource | null {
    const resource = this.resourceManagement.getResource(resourceId);
    if (!resource) return null;

    // Check if user can read the associated topic
    const topic = this.getTopic(resource.topicId);
    if (!topic || !this.permissionContext.canRead(this.user, topic)) {
      throw new Error("Permission denied: Cannot read this resource");
    }

    return resource;
  }

  getResourcesByTopic(topicId: string): BaseResource[] {
    const topic = this.getTopic(topicId);
    if (!topic || !this.permissionContext.canRead(this.user, topic)) {
      return [];
    }

    return this.resourceManagement.getResourcesByTopic(topicId);
  }

  updateResource(
    resourceId: string,
    updateData: Partial<Omit<IResource, "id" | "createdAt" | "updatedAt">>
  ): BaseResource | null {
    const resource = this.resourceManagement.getResource(resourceId);
    if (!resource) return null;

    const topic = this.getTopic(resource.topicId);
    if (
      !topic ||
      !this.permissionContext.canManageResources(this.user, topic)
    ) {
      throw new Error("Permission denied: Cannot update this resource");
    }

    return this.resourceManagement.updateResource(resourceId, updateData);
  }

  deleteResource(resourceId: string): boolean {
    const resource = this.resourceManagement.getResource(resourceId);
    if (!resource) return false;

    const topic = this.getTopic(resource.topicId);
    if (
      !topic ||
      !this.permissionContext.canManageResources(this.user, topic)
    ) {
      throw new Error("Permission denied: Cannot delete this resource");
    }

    return this.resourceManagement.deleteResource(resourceId);
  }

  // Get all topics for building hierarchy
  getAllLatestTopics(): Map<string, BaseTopic> {
    const allTopics = new Map<string, BaseTopic>();

    // For demo, we'll use the version control system
    for (const [topicId] of this.versionControl["versions"]) {
      const latestTopic = this.versionControl.getLatestVersion(topicId);
      if (
        latestTopic &&
        this.permissionContext.canRead(this.user, latestTopic)
      ) {
        allTopics.set(topicId, latestTopic);
      }
    }

    return allTopics;
  }

  // Recursive topic retrieval with tree structure including resources
  getTopicTree(topicId: string): ITopicTree | null {
    const topic = this.getTopic(topicId);
    if (!topic) return null;

    const allTopics = this.getAllLatestTopics();

    const buildTree = (currentTopic: BaseTopic): ITopicTree => {
      const children: ITopicTree[] = [];
      const resources = this.getResourcesByTopic(currentTopic.id);

      // Find all direct children
      for (const [, childTopic] of allTopics) {
        if (childTopic.parentTopicId === currentTopic.id) {
          children.push(buildTree(childTopic));
        }
      }

      return {
        topic: currentTopic,
        resources,
        children,
      };
    };

    return buildTree(topic);
  }

  findShortestPath(startTopicId: string, targetTopicId: string): string[] {
    const allTopics = this.getAllLatestTopics();
    return CustomPathfinder.findShortestPath(
      startTopicId,
      targetTopicId,
      allTopics
    );
  }
}
