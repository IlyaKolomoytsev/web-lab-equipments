const express = require('express');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const prisma = new PrismaClient();

dotenv.config(); // Подключение переменных окружения

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Для обработки JSON в теле запроса

// Эндпоинт для получения всех групп
app.get('/groups', async (req, res) => {
    try {
        const groups = await prisma.equipmentGroup.findMany({
            include: {
                equipments: true,
            },
        });
        res.json(groups);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
});

// Эндпоинт для создания новой группы
app.post('/groups', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newGroup = await prisma.equipmentGroup.create({
            data: {
                title,
                description,
            },
        });
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create group' });
    }
});

// Эндпоинт для получения группы по ID
app.get('/groups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const group = await prisma.equipmentGroup.findUnique({
            where: { id: Number(id) },
            include: { equipments: true },
        });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch group' });
    }
});

// Эндпоинт для обновления группы
app.put('/groups/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedGroup = await prisma.equipmentGroup.update({
            where: { id: Number(id) },
            data: { title, description },
        });
        res.json(updatedGroup);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update group' });
    }
});

// Эндпоинт для удаления группы
app.delete('/groups/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.equipmentGroup.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete group' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
