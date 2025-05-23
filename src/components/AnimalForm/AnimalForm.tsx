import React, { useEffect, useState, ChangeEvent } from 'react';
import { Input, Select, Radio, Space, message } from 'antd';
import { WomanOutlined, ManOutlined } from '@ant-design/icons';
import { Animal } from '../../Models/Animal';
import { AnimalRequest } from '../../requests/AnimalRequest';
import { AnimalView } from '../../Models/AnimalView';
import { AnimalBreed } from '../../Models/AnimalBreed';
import { AnimalStatus } from '../../Models/AnimalStatus';
import { PhotoUpload } from '../PhotoUpload/PhotoUpload';
import styles from './AnimalForm.module.css';

const { TextArea } = Input;

interface AnimalFormProps {
    initialValues?: Animal;
    animalViews: AnimalView[];
    animalBreeds: AnimalBreed[];
    animalStatuses: AnimalStatus[];
    onSubmit: (request: AnimalRequest) => void;
    onPhotoUpload?: (photoPath: string) => void;
    isEditing?: boolean;
}

export const AnimalForm: React.FC<AnimalFormProps> = ({
    initialValues,
    animalViews,
    animalBreeds,
    animalStatuses,
    onSubmit,
    onPhotoUpload,
    isEditing
}) => {
    const [formData, setFormData] = useState<AnimalRequest>({
        name: '',
        animalViewId: '',
        isMale: false,
        age: 1,
        weight: 1,
        animalBreedId: '',
        distinctiveFeatures: '',
        photos: '',
        animalStatusId: ''
    });

    const [filteredBreeds, setFilteredBreeds] = useState<AnimalBreed[]>([]);

    useEffect(() => {
        if (initialValues) {
            setFormData({
                name: initialValues.name,
                animalViewId: initialValues.animalViewId,
                isMale: initialValues.isMale,
                age: initialValues.age,
                weight: initialValues.weight,
                animalBreedId: initialValues.animalBreedId,
                distinctiveFeatures: initialValues.distinctiveFeatures,
                photos: initialValues.photos || '',
                animalStatusId: initialValues.animalStatusId
            });
        }
    }, [initialValues]);

    useEffect(() => {
        if (formData.animalViewId) {
            const breeds = animalBreeds.filter(breed => breed.animalViewId === formData.animalViewId);
            setFilteredBreeds(breeds);
            if (!breeds.some(breed => breed.id === formData.animalBreedId)) {
                setFormData(prev => ({ ...prev, animalBreedId: '' }));
            }
        } else {
            setFilteredBreeds([]);
            setFormData(prev => ({ ...prev, animalBreedId: '' }));
        }
    }, [formData.animalViewId, animalBreeds]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.photos) {
            message.warning('Пожалуйста, загрузите фото животного');
            return;
        }

        if (!formData.age) {
            message.warning('Пожалуйста, укажите возраст животного');
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Имя животного"
                className={styles.input}
            />

            <Select
                value={formData.animalViewId}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, animalViewId: value }))}
                placeholder="Выберите вид животного"
                className={styles.select}
                options={animalViews.map(view => ({
                    value: view.id,
                    label: view.title
                }))}
            />

            <Radio.Group
                value={formData.isMale}
                onChange={(e) =>
                    setFormData(prev => ({ ...prev, isMale: e.target.value }))}
                className={styles.radioGroup}
            >
                <Radio.Button value={false}>
                    <Space>
                        <WomanOutlined />
                        Самка
                    </Space>
                </Radio.Button>
                <Radio.Button value={true}>
                    <Space>
                        <ManOutlined />
                        Самец
                    </Space>
                </Radio.Button>
            </Radio.Group>

            <Input
                value={formData.age}
                type="number"
                min={0}
                max={100}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                        setFormData(prev => ({ ...prev, age: value }));
                    }
                }}
                placeholder="Возраст животного"
                className={styles.input}
            />

            <Input
                value={formData.weight}
                type="number"
                min={0.1}
                max={100}
                step={0.1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                        setFormData(prev => ({ ...prev, weight: value }));
                    }
                }}
                placeholder="Вес животного (кг)"
                className={styles.input}
            />

            <Select
                value={formData.animalBreedId}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, animalBreedId: value }))}
                placeholder="Выберите породу животного"
                className={styles.select}
                options={filteredBreeds.map(breed => ({
                    value: breed.id,
                    label: breed.title
                }))}
                disabled={!formData.animalViewId}
            />

            <TextArea
                value={formData.distinctiveFeatures}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData(prev => ({ ...prev, distinctiveFeatures: e.target.value }))}
                placeholder="Особенности и приметы"
                autoSize={{ minRows: 3, maxRows: 3 }}
                className={styles.textArea}
            />

            <PhotoUpload
                initialPhoto={formData.photos}
                onPhotoChange={(photoPath) => {
                    setFormData(prev => ({ ...prev, photos: photoPath }));
                    onPhotoUpload?.(photoPath);
                }}
                allowDelete={true}
            />

            <Select
                value={formData.animalStatusId}
                onChange={(value: string) =>
                    setFormData(prev => ({ ...prev, animalStatusId: value }))}
                placeholder="Выберите статус животного"
                className={styles.select}
                options={animalStatuses.map(status => ({
                    value: status.id,
                    label: status.title
                }))}
            />
        </form>
    );
}; 