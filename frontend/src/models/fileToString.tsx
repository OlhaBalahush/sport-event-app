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