const express = require('express');
const {PrismaClient} = require('@prisma/client');
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
        res.status(500).json({error: 'Failed to fetch groups'});
    }
});

// Эндпоинт для создания новой группы
app.post('/groups', async (req, res) => {
    const {title, description} = req.body;
    try {
        const newGroup = await prisma.equipmentGroup.create({
            data: {
                title,
                description,
            },
        });
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(500).json({error: 'Failed to create group'});
    }
});

// Эндпоинт для получения группы по ID
app.get('/groups/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const group = await prisma.equipmentGroup.findUnique({
            where: {id: Number(id)},
            include: {equipments: true},
        });
        if (!group) {
            return res.status(404).json({error: 'Group not found'});
        }
        res.json(group);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch group'});
    }
});

// Эндпоинт для обновления группы
app.put('/groups/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    try {
        const updatedGroup = await prisma.equipmentGroup.update({
            where: {id: Number(id)},
            data: {title, description},
        });
        res.json(updatedGroup);
    } catch (err) {
        res.status(500).json({error: 'Failed to update group'});
    }
});

// Эндпоинт для удаления группы
app.delete('/groups/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.equipmentGroup.delete({
            where: {id: Number(id)},
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: 'Failed to delete group' + err});
    }
});

// Эндпоинт для добавления нового оборудования в группу
app.post('/groups/:groupId/equipments', async (req, res) => {
    const {groupId} = req.params;
    const {title, description} = req.body;

    try {
        // Проверяем, существует ли группа, в которую добавляется оборудование
        const group = await prisma.equipmentGroup.findUnique({
            where: {id: Number(groupId)},
        });

        if (!group) {
            return res.status(404).json({error: 'Group not found'});
        }

        // Создаём новое оборудование
        const newEquipment = await prisma.equipment.create({
            data: {
                title,
                description,
                groupId: Number(groupId), // Связь с группой
            },
        });

        res.status(201).json(newEquipment);
    } catch (err) {
        res.status(500).json({error: 'Failed to add equipment'});
    }
});

app.put('/groups/:groupId/equipments/:equipmentId', async (req, res) => {
    const {groupId, equipmentId} = req.params;

    const groupIdNum = Number(groupId);
    const equipmentIdNum = Number(equipmentId);

    if (Number.isNaN(groupIdNum) || Number.isNaN(equipmentIdNum)) {
        return res.status(400).json({error: 'Invalid groupId or equipmentId'});
    }

    const {title, description, rented} = req.body;
    try {
        const updateEquipments = await prisma.equipment.update({
            where: {
                id: equipmentIdNum,
                groupId: groupIdNum,
            },
            data: {title, description, rented},
        })
        res.json(updateEquipments);
    } catch (err) {
        res.status(500).json({error: 'Failed to update equipment'});

    }
})

// Удаление оборудования по id группы и id оборудования
app.delete('/groups/:groupId/equipments/:equipmentId', async (req, res) => {
    const {groupId, equipmentId} = req.params;

    const groupIdNum = Number(groupId);
    const equipmentIdNum = Number(equipmentId);

    if (Number.isNaN(groupIdNum) || Number.isNaN(equipmentIdNum)) {
        return res.status(400).json({error: 'Invalid groupId or equipmentId'});
    }

    try {
        const result = await prisma.equipment.deleteMany({
            where: {
                id: equipmentIdNum,
                groupId: groupIdNum,
            },
        });

        if (result.count === 0) {
            // либо не существует такой группы, либо в этой группе нет такого equipment
            return res.status(404).json({error: 'Equipment not found in this group'});
        }

        return res.status(204).end(); // успешно удалили, содержимого нет
    } catch (err) {
        console.error('Failed to delete equipment:', err);
        return res.status(500).json({error: 'Failed to delete equipment'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
