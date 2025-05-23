import React from 'react';
import { Card, Button } from 'antd';
import { Animal } from '../../Models/Animal';
import { AnimalView } from '../../Models/AnimalView';
import { AnimalBreed } from '../../Models/AnimalBreed';
import { AnimalStatus } from '../../Models/AnimalStatus';
import { getPhotoUrl } from '../../services/uploadPhoto';
import styles from './AnimalCard.module.css';

interface AnimalCardProps {
    animal: Animal;
    animalViews: AnimalView[];
    animalBreeds: AnimalBreed[];
    animalStatuses: AnimalStatus[];
    onEdit: (animal: Animal) => void;
    onDelete: (id: string) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
    animal,
    animalViews,
    animalBreeds,
    animalStatuses,
    onEdit,
    onDelete
}) => {
    const getAnimalViewTitle = (animalViewId: string) =>
        animalViews.find(v => v.id === animalViewId)?.title || "Неизвестный вид";

    const getAnimalBreedTitle = (breedId: string) =>
        animalBreeds.find(b => b.id === breedId)?.title || "Неизвестная порода";

    const getAnimalStatusTitle = (statusId: string) =>
        animalStatuses.find(s => s.id === statusId)?.title || "Неизвестный статус";

    return (
        <Card
            className={styles.card}
            cover={
                <>
                    {animal.photos && (
                        <div className={styles.imageContainer}>
                            <img
                                src={getPhotoUrl(animal.photos)}
                                alt={animal.name}
                                className={styles.image}
                            />
                        </div>
                    )}
                    <div className={styles.header}>
                        <div className={styles.name}>{animal.name}</div>
                        <div className={styles.age}>{animal.age} лет</div>
                    </div>
                </>
            }
        >
            <div className={styles.content}>
                <p>
                    <strong>Пол: </strong>
                    {animal.isMale ? "Самец" : "Самка"}
                </p>
                <p>
                    <strong>Вес: </strong>
                    {animal.weight} кг
                </p>
                <p>
                    <strong>Особенности: </strong>
                    {animal.distinctiveFeatures}
                </p>
                <p>
                    <strong>Порода: </strong>
                    {getAnimalBreedTitle(animal.animalBreedId)}
                </p>
                <p>
                    <strong>Статус: </strong>
                    {getAnimalStatusTitle(animal.animalStatusId)}
                </p>
            </div>
            <div className={styles.actions}>
                <Button
                    onClick={() => onEdit(animal)}
                    className={styles.editButton}
                >
                    Редактировать
                </Button>
                <Button
                    onClick={() => onDelete(animal.id)}
                    danger
                    className={styles.deleteButton}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    );
}; 