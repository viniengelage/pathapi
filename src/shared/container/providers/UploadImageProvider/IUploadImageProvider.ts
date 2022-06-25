interface IUploadImageProvider {
  upload(file): Promise<void>;
}

export { IUploadImageProvider };
