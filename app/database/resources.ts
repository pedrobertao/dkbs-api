import { IResource, ResourceType } from "../entities/resource";
import { BaseResource } from "../patterns/composite/resource";
import { ResourceFactoryProvider } from "../patterns/factory/resource";

class ResourceManagement {
  private resources: Map<string, BaseResource> = new Map();
  private topicResources: Map<string, Set<string>> = new Map();

  createResource(
    resourceData: Omit<IResource, "createdAt" | "updatedAt">
  ): BaseResource {
    const factory = ResourceFactoryProvider.getFactory();
    const newResource = factory.createResource(resourceData);

    if (!newResource.validate()) {
      throw new Error(`Invalid resource data for type ${resourceData.type}`);
    }

    this.resources.set(newResource.id, newResource);

    if (!this.topicResources.has(resourceData.topicId)) {
      this.topicResources.set(resourceData.topicId, new Set());
    }
    this.topicResources.get(resourceData.topicId)!.add(newResource.id);

    return newResource;
  }

  getResource(resourceId: string): BaseResource | null {
    return this.resources.get(resourceId) || null;
  }

  getResourcesByTopic(topicId: string): BaseResource[] {
    const resourceIds = this.topicResources.get(topicId);
    if (!resourceIds) return [];

    return Array.from(resourceIds)
      .map((id) => this.resources.get(id))
      .filter((resource) => resource !== undefined) as BaseResource[];
  }

  updateResource(
    resourceId: string,
    updateData: Partial<Omit<IResource, "id" | "createdAt" | "updatedAt">>
  ): BaseResource | null {
    const resource = this.resources.get(resourceId);
    if (!resource) return null;

    // Update properties
    if (updateData.url) resource.url = updateData.url;
    if (updateData.description) resource.description = updateData.description;
    if (updateData.type) resource.type = updateData.type;
    resource.updatedAt = new Date();

    // Validate after update
    if (!resource.validate()) {
      throw new Error(
        `Invalid resource data after update for type ${resource.type}`
      );
    }

    return resource;
  }

  deleteResource(resourceId: string): boolean {
    const resource = this.resources.get(resourceId);
    if (!resource) return false;

    // Remove from topic associations
    const topicResourceSet = this.topicResources.get(resource.topicId);
    if (topicResourceSet) {
      topicResourceSet.delete(resourceId);
    }

    // Remove from main storage
    return this.resources.delete(resourceId);
  }

  getResourcesByType(type: ResourceType): BaseResource[] {
    return Array.from(this.resources.values()).filter(
      (resource) => resource.type === type
    );
  }
}
