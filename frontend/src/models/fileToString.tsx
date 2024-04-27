// Convert a File object to a Base64 string
export function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Convert an array of File objects to an array of Base64 strings
export async function filesToBase64Array(files: File[]) {
    const base64Array = await Promise.all(files.map(fileToBase64));
    return base64Array;
}

// Convert a base64 string to a Blob object
export function base64StringToBlob(base64String: string) {
    const byteString = atob(base64String.split(',')[1]);
    const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

export function extractFileNameFromBase64(base64String: string) {
    // Extract the file name from the base64 string if it's embedded
    // This is just an example, you might need to adjust this based on how the file name is encoded in your specific case
    const matches = base64String.match(/^data:(\w+)\/(\w+);(?:.+)=(.+);/);
    if (matches && matches.length > 3) {
        return matches[3];
    } else {
        return 'certificate'; // Default filename if unable to extract from base64 string
    }
}
