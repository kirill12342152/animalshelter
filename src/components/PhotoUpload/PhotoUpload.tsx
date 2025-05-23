import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadPhoto, deletePhoto, getPhotoUrl } from '../../services/uploadPhoto';
import { config } from '../../config';
import styles from './PhotoUpload.module.css';

interface PhotoUploadProps {
    initialPhoto?: string;
    onPhotoChange: (photoPath: string) => void;
    allowDelete?: boolean;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
    initialPhoto,
    onPhotoChange,
    allowDelete = false
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (initialPhoto) {
            setFileList([{
                uid: '-1',
                name: 'image.jpg',
                status: 'done',
                url: getPhotoUrl(initialPhoto)
            }]);
        } else {
            setFileList([]);
        }
    }, [initialPhoto]);

    const handleChange = async (info: any) => {
        if (info.file.status === 'done') {
            const response = await info.file.response;
            if (response?.filePath) {
                onPhotoChange(response.filePath);
                message.success('Фото успешно загружено');
            }
        }

        if (info.file.status === 'removed' && initialPhoto) {
            try {
                await deletePhoto(initialPhoto);
                onPhotoChange('');
                message.success('Фото успешно удалено');
            } catch (error) {
                message.error('Не удалось удалить фото');
            }
        }

        setFileList(info.fileList);
    };

    return (
        <Upload
            name="file"
            listType="picture-card"
            className={styles.uploader}
            showUploadList={{ showRemoveIcon: allowDelete }}
            action={`${config.apiUrl}/UploadPhoto/upload-photo`}
            onChange={handleChange}
            fileList={fileList}
            maxCount={1}
            accept="image/*"
        >
            {fileList.length === 0 && (
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить фото</div>
                </div>
            )}
        </Upload>
    );
}; 