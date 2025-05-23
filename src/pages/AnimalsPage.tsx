import React, { useEffect, useState, useCallback } from 'react';
import { Typography, message, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { config } from '../config';
import { Animal } from '../Models/Animal';
import { AnimalView } from '../Models/AnimalView';
import { AnimalBreed } from '../Models/AnimalBreed';
import { AnimalStatus } from '../Models/AnimalStatus';
import { getAllAnimalViews } from '../services/animalViews';
import { getAllAnimalBreeds } from '../services/animalBreeds';
import { getAllAnimalStatuses } from '../services/animalStatuses';
import { deletePhoto } from '../services/uploadPhoto';
import { AnimalCard } from '../components/AnimalCard/AnimalCard';
import { CreateUpdateAnimal } from '../components/CreateUpdateAnimal/CreateUpdateAnimal';
import styles from './AnimalsPage.module.css';

const { Title } = Typography;

export const AnimalsPage: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalViews, setAnimalViews] = useState<AnimalView[]>([]);
    const [animalBreeds, setAnimalBreeds] = useState<AnimalBreed[]>([]);
    const [animalStatuses, setAnimalStatuses] = useState<AnimalStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState<Animal | undefined>();

    const fetchAnimals = useCallback(async () => {
        try {
            const response = await fetch(`${config.apiUrl}/Animals`);
            if (!response.ok) throw new Error('Ошибка при загрузке животных');
            const data = await response.json();
            setAnimals(data);
        } catch (error) {
            message.error('Не удалось загрузить животных');
        }
    }, []);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [views, breeds, statuses] = await Promise.all([
                getAllAnimalViews(),
                getAllAnimalBreeds(),
                getAllAnimalStatuses()
            ]);
            setAnimalViews(views);
            setAnimalBreeds(breeds);
            setAnimalStatuses(statuses);
            await fetchAnimals();
        } catch (error) {
            message.error('Не удалось загрузить данные');
        } finally {
            setLoading(false);
        }
    }, [fetchAnimals]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id: string) => {
        try {
            const animal = animals.find(a => a.id === id);
            if (animal?.photos) {
                await deletePhoto(animal.photos);
            }
            await fetch(`${config.apiUrl}/Animals/${id}`, { method: 'DELETE' });
            setAnimals(animals.filter(animal => animal.id !== id));
            message.success('Животное успешно удалено');
        } catch (error) {
            message.error('Не удалось удалить животное');
        }
    };

    const handleEdit = (animal: Animal) => setEditingAnimal(animal);
    const handleCloseModal = () => {
        setEditingAnimal(undefined);
        setIsCreateModalOpen(false);
    };
    const handleModalSuccess = () => {
        fetchAnimals();
        handleCloseModal();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={2} className={styles.title}>Животные</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Добавить животное
                </Button>
            </div>
            <Spin spinning={loading}>
                <div className={styles.grid}>
                    {animals.map((animal) => (
                        <AnimalCard
                            key={animal.id}
                            animal={animal}
                            animalViews={animalViews}
                            animalBreeds={animalBreeds}
                            animalStatuses={animalStatuses}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </Spin>
            <CreateUpdateAnimal
                animal={editingAnimal}
                isOpen={isCreateModalOpen || !!editingAnimal}
                onClose={handleCloseModal}
                onSuccess={handleModalSuccess}
            />
        </div>
    );
}; 