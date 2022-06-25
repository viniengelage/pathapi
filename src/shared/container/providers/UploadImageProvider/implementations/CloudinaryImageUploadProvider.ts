import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

import { IUploadImageProvider } from "../IUploadImageProvider";

class CloudinaryImageUploadProvider implements IUploadImageProvider {
  async upload(file): Promise<void> {
    console.log("Noia");
  }
}

export { CloudinaryImageUploadProvider };
