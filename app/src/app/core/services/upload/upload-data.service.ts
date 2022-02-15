
export class UploadDataService
{

  getFileByBase64(data: any, fileName: string, props?: FilePropertyBag): File
  {
    const blobs: BlobPart[] = [this.dataURLtoBlob(data)];
    const result: File = new File(blobs, fileName, props);

    return result;
  }

  dataURLtoBlob(dataUrl) {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }
}
