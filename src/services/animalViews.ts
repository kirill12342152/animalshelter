import { config } from '../config';
import { AnimalView } from '../Models/AnimalView';

export const getAllAnimalViews = async (): Promise<AnimalView[]> => {
    const response = await fetch(`${config.apiUrl}/AnimalViews`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch animal views');
    }

    return response.json();
}; 