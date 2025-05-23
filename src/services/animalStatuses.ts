import { config } from '../config';
import { AnimalStatus } from '../Models/AnimalStatus';

export const getAllAnimalStatuses = async (): Promise<AnimalStatus[]> => {
    const response = await fetch(`${config.apiUrl}/AnimalStatuses`);
    if (!response.ok) {
        throw new Error('Failed to fetch animal statuses');
    }
    return response.json();
}; 