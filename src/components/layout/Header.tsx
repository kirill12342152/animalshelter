import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

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
        <AntHeader className={styles.header}>
            <div className={styles.logo}>
                Приют животных
            </div>
            <Menu
                mode="horizontal"
                items={menuItems}
                className={styles.menu}
            />
        </AntHeader>
    );
}; 