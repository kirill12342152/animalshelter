import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

export const HomePage: React.FC = () => {
    return (
        <div style={{
            padding: '50px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <Card>
                <Title level={2}>Добро пожаловать в приют животных!</Title>
                <Paragraph>
                    Здесь вы можете найти своего нового друга. Мы заботимся о каждом животном и помогаем им найти любящий дом.
                </Paragraph>
            </Card>
        </div>
    );
}; 