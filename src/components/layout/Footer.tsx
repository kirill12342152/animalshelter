import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

export const Footer: React.FC = () => {
    return (
        <AntFooter style={{
            textAlign: 'center',
            background: '#fff',
            padding: '20px 50px',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
        }}>
            Hello World
        </AntFooter>
    );
}; 