import { urlToFile } from "./url-to-file";

export async function processGallery(galleryUrls=[]) {
    const files = await Promise.all(
        galleryUrls.map(async (url) => {
            try {
                const file = await urlToFile(url);
                console.log("File object created:", file);
                return file;
            } catch (error) {
                throw new Error(error)
            }
        })
    );
    return files;
}