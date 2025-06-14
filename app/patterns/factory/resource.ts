import { IResource, ResourceType } from "../../entities/resource";
import {
  ImageResource,
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
      case ResourceType.IMAGE:
        return new ImageResource(data);
      case ResourceType.PDF:
        return new PDFResource(data);
      default:
        throw new Error("Resource invalid");
    }
  }
}
