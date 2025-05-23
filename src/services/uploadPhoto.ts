import { config } from '../config';

interface UploadResponse {
    filePath: string;
}

export const handleResponse = async (response: any) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки фото: ${errorText}`);
    }
    return response.json();
};

export const getPhotoUrl = (photoPath: string): string => {
    if (!photoPath) return '';
    return `${config.apiUrl}/UploadPhoto/get-photo?photoPath=${encodeURIComponent(photoPath)}`;
};

export const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${config.apiUrl}/UploadPhoto/upload-photo`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Ошибка загрузки фото');
    }

    const result = await response.json();
    return result.filePath;
};

export const deletePhoto = async (photoPath: string): Promise<void> => {
    if (!photoPath) return;

    const response = await fetch(`${config.apiUrl}/UploadPhoto/delete-photo?photoPath=${encodeURIComponent(photoPath)}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Ошибка удаления фото');
    }
}; 