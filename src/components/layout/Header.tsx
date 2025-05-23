import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Главная',
            onClick: () => navigate('/')
        },
        {
            key: 'animals',
            icon: <HeartOutlined />,
            label: 'Животные',
            onClick: () => navigate('/animals')
        }
    ];

    return (
        <AntHeader style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            padding: '0 50px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginRight: '30px'
            }}>
                Приют животных
            </div>
            <Menu
                mode="horizontal"
                items={menuItems}
                style={{ flex: 1 }}
            />
        </AntHeader>
    );
}; 