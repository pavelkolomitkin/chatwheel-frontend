
export class UploadFile
{

  constructor(
    public file: File,
  ) {}

  uploadedBytes: number;
  totalSizeBytes: number;

  percentageProgress: number = 0;

  body: any = null;

  public setProgress(uploadedBytes: number, totalSizeBytes: number)
  {
    this.uploadedBytes = uploadedBytes;
    this.totalSizeBytes = totalSizeBytes;

    this.percentageProgress = Math.round(100 * this.uploadedBytes / this.totalSizeBytes);

    return this;
  }
}
