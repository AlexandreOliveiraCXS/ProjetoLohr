import { Router, Request, Response } from 'express';
import { DATE } from 'sequelize/dist';
import generateUniqueId from '../../../useful/generateId';
import EventModel from '../../database/models/event';

const eventRouter = Router();

interface iEvent {
    id?: string,
    name?: string,
    appointment?: Date,

}

eventRouter.post('/new', async (req: Request, res: Response) => {
    const { name, appointment }: iEvent = req.body;

    const eventFind = await EventModel.findOne({
        where: { name }
    });

    if (eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event already exists"
        });

    const appointmentDate = new Date(appointment)
    // .toLocaleString('pt-BR', {
    //     timeZone: process.env.TZ
    // });

    const event = await EventModel.create({
        id: generateUniqueId(),
        name,
        appointment: appointmentDate
    });

    return res.status(201).json(event);
});

eventRouter.get('/all', async (req: Request, res: Response) => {
    const eventFind = await EventModel.findAll();

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "No base event"
        });

    return res.status(201).json(eventFind);
});

eventRouter.get('/', async (req: Request, res: Response) => {
    const { id }: iEvent = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }

    });
    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    const contact = await EventModel.findOne({
        where: { id }
    });

    return res.status(202).json(contact);
});

eventRouter.put('/edit', async (req: Request, res: Response) => {
    const { name, appointment }: iEvent = req.body;
    const { id }: iEvent = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }
    });

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    const appointmentDate = new Date(appointment);

    var group = {
        name,
        appointment: appointmentDate
    }

    const groupEdit = await EventModel.update(group, {
        where: {
            id
        }
    });

    return res.status(201).json(groupEdit);
});

eventRouter.delete('/delete', async (req: Request, res: Response) => {
    const { id }: iEvent = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }

    });
    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    const group = await EventModel.destroy({
        where: { id }
    });

    return res.status(202).json(group);
});


export default eventRouter;
