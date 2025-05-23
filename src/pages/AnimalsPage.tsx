import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const AnimalsPage: React.FC = () => {
    return (
        <div style={{
            padding: '50px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <Title level={2}>Животные</Title>
            {/* Здесь будет список животных */}
        </div>
    );
}; 