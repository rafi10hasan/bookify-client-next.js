export function getMimeType(extension){
    const mimeTypes = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        pdf: 'application/pdf',
        txt: 'text/plain',
    };
    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}