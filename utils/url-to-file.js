import { extractFileName } from "./extract-filename";
import { getMimeType } from "./get-mime-type";

export async function urlToFile(url){
  const urlParts = url.split('/');
  const fileNameWithExtension = urlParts[urlParts.length - 1];
  const filename = extractFileName(fileNameWithExtension)
  const fileExtension = filename.split('.').pop();
  const mimeType = getMimeType(fileExtension);

  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}