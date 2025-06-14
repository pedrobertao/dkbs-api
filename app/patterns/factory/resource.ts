import { IResource, ResourceType } from "../../entities/resource";
import {
  ArticleResource,
  BaseResource,
  PDFResource,
  VideoResource,
} from "../composite/resource";

export interface IResourceFactory {
  createResource(
    data: Omit<IResource, "createdAt" | "updatedAt">
  ): BaseResource;
}

export class ResourceFactory implements IResourceFactory {
  createResource(
    data: Omit<IResource, "createdAt" | "updatedAt">
  ): BaseResource {
    switch (data.type) {
      case ResourceType.VIDEO:
        return new VideoResource(data);
      case ResourceType.ARTICLE:
        return new ArticleResource(data);
      case ResourceType.PDF:
        return new PDFResource(data);
      default:
        throw new Error("Resource invalid");
    }
  }
}
