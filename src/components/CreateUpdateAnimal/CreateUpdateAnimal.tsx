import React, { useEffect, useState } from 'react';
import { Modal, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Animal } from '../../Models/Animal';
import { AnimalView } from '../../Models/AnimalView';
import { AnimalBreed } from '../../Models/AnimalBreed';
import { AnimalStatus } from '../../Models/AnimalStatus';
import { AnimalRequest } from '../../requests/AnimalRequest';
import { AnimalForm } from '../AnimalForm/AnimalForm';
import { getAllAnimalViews } from '../../services/animalViews';
import { getAllAnimalBreeds } from '../../services/animalBreeds';
import { getAllAnimalStatuses } from '../../services/animalStatuses';
import { createAnimal, updateAnimal } from '../../services/animals';
import { deletePhoto } from '../../services/uploadPhoto';
import styles from './CreateUpdateAnimal.module.css';

interface CreateUpdateAnimalProps {
    animal?: Animal;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const CreateUpdateAnimal: React.FC<CreateUpdateAnimalProps> = ({
    animal,
    isOpen,
    onClose,
    onSuccess
}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [animalViews, setAnimalViews] = useState<AnimalView[]>([]);
    const [animalBreeds, setAnimalBreeds] = useState<AnimalBreed[]>([]);
    const [animalStatuses, setAnimalStatuses] = useState<AnimalStatus[]>([]);
    const [formKey, setFormKey] = useState(0);
    const [uploadedPhoto, setUploadedPhoto] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [views, breeds, statuses] = await Promise.all([
                    getAllAnimalViews(),
                    getAllAnimalBreeds(),
                    getAllAnimalStatuses()
                ]);
                setAnimalViews(views);
                setAnimalBreeds(breeds);
                setAnimalStatuses(statuses);
            } catch (error) {
                message.error('Ошибка при загрузке данных');
                console.error('Error fetching data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    const handleSubmit = async (request: AnimalRequest) => {
        setLoading(true);
        try {
            if (animal) {
                await updateAnimal(animal.id, request);
                message.success('Животное успешно обновлено');
            } else {
                await createAnimal(request);
                message.success('Животное успешно добавлено');
            }
            setFormKey(prev => prev + 1);
            onSuccess();
        } catch (error) {
            message.error('Ошибка при сохранении животного');
            console.error('Error saving animal:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = async () => {
        if (uploadedPhoto && !animal) {
            try {
                await deletePhoto(uploadedPhoto);
            } catch (error) {
                console.error('Error deleting photo:', error);
            }
        }
        setFormKey(prev => prev + 1);
        onClose();
    };

    return (
        <Modal
            title={animal ? 'Редактировать животное' : 'Добавить животное'}
            open={isOpen}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>
                    Отмена
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                        const form = document.querySelector('form');
                        form?.requestSubmit();
                    }}
                    loading={loading}
                >
                    {animal ? 'Сохранить' : 'Добавить'}
                </Button>
            ]}
            width={800}
            className={styles.modal}
            destroyOnHidden={true}
        >
            <AnimalForm
                key={formKey}
                initialValues={animal}
                animalViews={animalViews}
                animalBreeds={animalBreeds}
                animalStatuses={animalStatuses}
                onSubmit={handleSubmit}
                onPhotoUpload={setUploadedPhoto}
                isEditing={!!animal}
            />
        </Modal>
    );
}; 