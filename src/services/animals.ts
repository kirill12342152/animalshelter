import { config } from "../config";
import { Animal } from '../Models/Animal';
import { AnimalRequest as RequestModel } from '../requests/AnimalRequest';

export interface AnimalRequest{
    name: string;
    animalViewId: string;
    isMale: boolean;
    age: number;
    animalBreedId: string;
    distinctiveFeatures: string;
    weight : number;
    photos : string;
    animalStatusId : string;
}

export const getAllAnimals = async () => {
    const response = await fetch(`${config.apiUrl}/Animals`);

    return response.json();
}

export const createAnimal = async (request: RequestModel): Promise<Animal> => {
    console.log('Sending request:', request);
    
    const response = await fetch(`${config.apiUrl}/Animals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Failed to create animal: ${errorText}`);
    }

    return response.json();
};

export const updateAnimal = async (id: string, request: RequestModel): Promise<Animal> => {
    const formattedRequest = {
        request: {
            Name: request.name || '',
            AnimalViewId: request.animalViewId || '',
            IsMale: request.isMale,
            Age: request.age || 0,
            Weight: request.weight || 0,
            AnimalBreedId: String(request.animalBreedId || ''),
            DistinctiveFeatures: request.distinctiveFeatures || '',
            Photos: request.photos || '',
            AnimalStatusId: request.animalStatusId || ''
        }
    };

    const response = await fetch(`${config.apiUrl}/Animals/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formattedRequest)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Failed to update animal: ${errorText}`);
    }

    return response.json();
};

export const deleteAnimal = async (id: string) => {
    await fetch(`${config.apiUrl}/Animals/${id}`, {
        method: "DELETE",
    }); 
}