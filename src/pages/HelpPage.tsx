import React from 'react';
import { Typography, Card, Button, Space, List } from 'antd';
import { HeartOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './HelpPage.module.css';

const { Title, Paragraph } = Typography;

export const HelpPage: React.FC = () => {
    const volunteerDuties = [
        'выгул собак и социализация животных',
        'уборка помещений и вольеров',
        'фотосъемка животных',
        'информационное кураторство (написание текстов о животных и размещение информации в Интернете)'
    ];

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <Title level={2}>Добро пожаловать в приют животных!</Title>
                <Paragraph>
                    Здесь вы можете найти своего нового друга. Мы заботимся о каждом животном и помогаем им найти любящий дом.
                </Paragraph>
            </Card>

            <Space direction="vertical" size="large" className={styles.helpSection}>
                <Card
                    title={
                        <Space>
                            <HeartOutlined />
                            <span>Стать волонтером</span>
                        </Space>
                    }
                    className={styles.helpCard}
                >
                    <Paragraph>
                        Животные находятся в приютах, в безопасности, накормленные и подлеченные только благодаря волонтерам.
                        И помощь этим людям нужна всегда. Желательно участие волонтеров на постоянной основе.
                    </Paragraph>

                    <Title level={4}>Что требуется от волонтеров в приютах:</Title>
                    <List
                        dataSource={volunteerDuties}
                        renderItem={item => (
                            <List.Item>
                                <Paragraph>{item}</Paragraph>
                            </List.Item>
                        )}
                    />

                    <Paragraph>
                        Волонтером может стать любой, кому не безразлична судьба бездомных животных.
                        Возрастные ограничения – с 18 лет (с 14 до 18 лет только в сопровождении родителей).
                    </Paragraph>

                    <Button type="primary" size="large" block>
                        Подать заявку
                    </Button>
                </Card>

                <Card
                    title={
                        <Space>
                            <HomeOutlined />
                            <span>Взять животное на передержку</span>
                        </Space>
                    }
                    className={styles.helpCard}
                >
                    <Paragraph>
                        Передержка — это временный дом для животного до пристроя в постоянную семью,
                        на период вакцинации (для малышей) или на период реабилитации после лечения.
                        Передержка – это практически самая важная часть в спасении жизни бездомного животного.
                    </Paragraph>

                    <Paragraph>
                        Если вы готовы взять на себя временные обязанности по уходу за животным и его содержанию
                        на своей территории, у вас есть возможность и желание помочь спасти чью-то маленькую жизнь,
                        оставьте заявку в указанной форме!
                    </Paragraph>

                    <Button type="primary" size="large" block>
                        Подать заявку
                    </Button>
                </Card>
            </Space>
        </div>
    );
}; 