import { BaseTopic } from "../patterns/composite/topic";

export class CustomPathfinder {
  // Custom implementation of Dijkstra's algorithm
  static findShortestPath(
    startId: string,
    targetId: string,
    topicMap: Map<string, BaseTopic>
  ): string[] {
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const visited = new Set<string>();
    const unvisited = new Set<string>();

    // Initialize distances
    for (const [id] of topicMap) {
      distances.set(id, id === startId ? 0 : Infinity);
      previous.set(id, null);
      unvisited.add(id);
    }

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let current: string | null = null;
      let minDistance = Infinity;

      for (const nodeId of unvisited) {
        const distance = distances.get(nodeId) || Infinity;
        if (distance < minDistance) {
          minDistance = distance;
          current = nodeId;
        }
      }

      if (!current || minDistance === Infinity) break;

      unvisited.delete(current);
      visited.add(current);

      if (current === targetId) break;

      // Get neighbors (parent and children)
      const currentTopic = topicMap.get(current);
      if (!currentTopic) continue;

      const neighbors: string[] = [];

      // Add parent as neighbor
      if (currentTopic.parentTopicId) {
        neighbors.push(currentTopic.parentTopicId);
      }

      // Add children as neighbors
      for (const [id, topic] of topicMap) {
        if (topic.parentTopicId === current) {
          neighbors.push(id);
        }
      }

      // Update distances to neighbors
      for (const neighborId of neighbors) {
        if (visited.has(neighborId)) continue;

        const currentDistance = distances.get(current) || 0;
        const tentativeDistance = currentDistance + 1;
        const neighborDistance = distances.get(neighborId) || Infinity;

        if (tentativeDistance < neighborDistance) {
          distances.set(neighborId, tentativeDistance);
          previous.set(neighborId, current);
        }
      }
    }

    // Reconstruct path
    const path: string[] = [];
    let current: string | null = targetId;

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current) || null;
    }

    return path[0] === startId ? path : [];
  }
}
