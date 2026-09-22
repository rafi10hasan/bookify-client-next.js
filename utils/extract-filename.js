export function extractFileName(fullFileName) {
    const parts = fullFileName.split(/[_\-\s]+/);
    
    if (parts.length > 1 && parts[parts.length - 1].includes('.')) {
        return parts.slice(1).join('_'); 
    }
    return fullFileName; 
}