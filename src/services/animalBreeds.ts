import { config } from '../config';
import { AnimalBreed } from '../Models/AnimalBreed';

export const getAllAnimalBreeds = async (): Promise<AnimalBreed[]> => {
    const response = await fetch(`${config.apiUrl}/AnimalBreeds`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch animal breeds');
    }
    return response.json();
}; 