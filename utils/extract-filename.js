export function extractFileName(fullFileName) {
    const parts = fullFileName.split(/[_\-\s]+/);
    // Split by underscore, hyphen, or space
    if (parts.length > 1 && parts[parts.length - 1].includes('.')) {
        return parts.slice(1).join('_'); // Rejoin from second part onwards (ignoring prefix)
    }
    return fullFileName; // Return full name if no specific pattern
}