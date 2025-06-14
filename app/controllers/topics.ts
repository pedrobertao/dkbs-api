import { ITopicTree, ITopic } from "../entities/topic";
import { BaseTopic } from "../patterns/composite/topic";
import { TopicManagementService } from "../services/topicManagement";

export class TopicController {
  constructor(private service: TopicManagementService) {}

  // GET
  async getTopic(id: string): Promise<BaseTopic | null> {
    try {
      return this.service.getTopic(id);
    } catch (error) {
      throw new Error(`Failed to get topic tree: ${error}`);
    }
  }

  // GET /topics/:id/tree - Get topic with all subtopics recursively
  async getTopicTree(id: string): Promise<ITopicTree | null> {
    try {
      return this.service.getTopicTree(id);
    } catch (error) {
      throw new Error(`Failed to get topic tree: ${error}`);
    }
  }

  // GET /topics/:id/versions/:version? - Get specific version or latest
  async getTopicByVersion(req: {
    params: { id: string; version?: string };
  }): Promise<BaseTopic | null> {
    try {
      const version = req.params.version
        ? parseInt(req.params.version)
        : undefined;
      return this.service.getTopic(req.params.id, version);
    } catch (error) {
      throw new Error(`Failed to get topic: ${error}`);
    }
  }

  // POST /topics - Create or update topic
  async createTopicOrUpdate(req: {
    body: Omit<ITopic, "createdAt" | "updatedAt" | "version">;
  }): Promise<BaseTopic> {
    try {
      return this.service.createOrUpdateTopic(req.body);
    } catch (error) {
      throw new Error(`Failed to create topic: ${error}`);
    }
  }

  // GET /topics/:startId/path/:targetId - Find shortest path
  // async findPath(req: {
  //   params: { startId: string; targetId: string };
  // }): Promise<string[]> {
  //   try {
  //     return this.service.findShortestPath(
  //       req.params.startId,
  //       req.params.targetId
  //     );
  //   } catch (error) {
  //     throw new Error(`Failed to find path: ${error}`);
  //   }
  // }

  async deleteResource(id: string): Promise<boolean> {
    try {
      return this.service.deleteResource(id);
    } catch (error) {
      throw new Error(`Failed to get version history: ${error}`);
    }
  }
}
