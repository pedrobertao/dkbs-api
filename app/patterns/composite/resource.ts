import { IResource, ResourceType } from "../../entities/resource";

export abstract class BaseResource implements IResource {
  public id: string;
  public topicId: string;
  public url: string;
  public description: string;
  public type: ResourceType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: Omit<IResource, "createdAt" | "updatedAt">) {
    this.id = data.id;
    this.topicId = data.topicId;
    this.url = data.url;
    this.description = data.description;
    this.type = data.type;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  abstract validate(): boolean;
  abstract getMetadata(): Record<string, any>;
}

export class VideoResource extends BaseResource {
  validate(): boolean {
    return (
      this.url.includes("youtube.com") ||
      this.url.includes("vimeo.com") ||
      this.url.endsWith(".mp4") ||
      this.url.endsWith(".webm")
    );
  }

  getMetadata(): Record<string, any> {
    return {
      type: "video",
      streamable: true,
      requiresPlayer: true,
    };
  }
}

export class ImageResource extends BaseResource {
  validate(): boolean {
    return this.url.startsWith("http") || this.url.startsWith("https");
  }

  getMetadata(): Record<string, any> {
    return {
      type: "image",
      readable: true,
    };
  }
}

export class PDFResource extends BaseResource {
  validate(): boolean {
    return this.url.endsWith(".pdf") || this.url.includes("pdf");
  }

  getMetadata(): Record<string, any> {
    return {
      type: "pdf",
      downloadable: true,
      requiresViewer: true,
    };
  }
}
