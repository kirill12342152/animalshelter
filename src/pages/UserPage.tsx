import React, { useState } from 'react';
import { Typography, Card, Form, Input, Button, Tabs, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './UserPage.module.css';

const { Title } = Typography;

interface AuthForm {
    lastName: string;
    firstName: string;
    middleName?: string;
    phone: string;
    email: string;
    login: string;
    password: string;
}

const MIN_PASSWORD_LENGTH = 6;
const MIN_LOGIN_LENGTH = 5;
const MIN_NAME_LENGTH = 2;

const TAB_ITEMS = [
    {
        key: 'login',
        label: 'Вход',
    },
    {
        key: 'register',
        label: 'Регистрация',
    },
];

export const UserPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values: AuthForm) => {
        setLoading(true);
        try {
            if (isLogin) {
                // TODO: Добавить логику авторизации
                console.log('Авторизация:', values);
                message.success('Успешная авторизация');
            } else {
                // TODO: Добавить логику регистрации
                console.log('Регистрация:', values);
                message.success('Успешная регистрация');
            }
        } catch (error) {
            message.error('Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    const renderPersonalInfoFields = () => (
        <Row gutter={16}>
            <Col span={8}>
                <Form.Item
                    name="lastName"
                    rules={[
                        { required: true, message: 'Введите фамилию' },
                        { min: MIN_NAME_LENGTH, message: `Минимум ${MIN_NAME_LENGTH} символа` }
                    ]}
                >
                    <Input
                        placeholder="Фамилия"
                        size="large"
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    name="firstName"
                    rules={[
                        { required: true, message: 'Введите имя' },
                        { min: MIN_NAME_LENGTH, message: `Минимум ${MIN_NAME_LENGTH} символа` }
                    ]}
                >
                    <Input
                        placeholder="Имя"
                        size="large"
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    name="middleName"
                >
                    <Input
                        placeholder="Отчество"
                        size="large"
                    />
                </Form.Item>
            </Col>
        </Row>
    );

    const renderRegistrationFields = () => (
        <>
            {renderPersonalInfoFields()}
            <Form.Item
                name="login"
                rules={[
                    { required: true, message: 'Пожалуйста, введите логин' },
                    { min: MIN_LOGIN_LENGTH, message: `Логин должен быть не менее ${MIN_LOGIN_LENGTH} символов` }
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Логин"
                    size="large"
                />
            </Form.Item>
            <Form.Item
                name="phone"
                rules={[
                    { required: true, message: 'Пожалуйста, введите телефон' },
                    { pattern: /^\+?[0-9]{10,15}$/, message: 'Введите корректный номер телефона' }
                ]}
            >
                <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Телефон"
                    size="large"
                />
            </Form.Item>
        </>
    );

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Title level={2} className={styles.title}>
                    {isLogin ? 'Вход в систему' : 'Регистрация'}
                </Title>
                <Tabs
                    activeKey={isLogin ? 'login' : 'register'}
                    onChange={(key) => setIsLogin(key === 'login')}
                    items={TAB_ITEMS}
                />
                <Form
                    form={form}
                    name="auth"
                    onFinish={handleSubmit}
                    layout="vertical"
                    className={styles.form}
                >
                    {!isLogin && renderRegistrationFields()}

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите email' },
                            { type: 'email', message: 'Введите корректный email' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите пароль' },
                            { min: MIN_PASSWORD_LENGTH, message: `Пароль должен быть не менее ${MIN_PASSWORD_LENGTH} символов` }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Пароль"
                            size="large"
                        />
                    </Form.Item>

                    {!isLogin && (
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Пожалуйста, подтвердите пароль' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Подтвердите пароль"
                                size="large"
                            />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            icon={<UserOutlined />}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}; 