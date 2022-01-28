import { Router, Request, Response } from 'express';
import ContactsModel from '../../database/models/contacts';
import EventModel from '../../database/models/event';
import EventContactsModel from '../../database/models/eventContacts';
import { QueryTypes } from 'sequelize';
import sequelize from '../../database';
import sendEmail from '../../../useful/sendMail';


const eventContactRouter = Router();

interface iEventContact {
    id?: string,
    contacts?: string[]

}

eventContactRouter.get('/', async (req: Request, res: Response) => {
    const { id }: iEventContact = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }
    });

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });


    const eventContactsFind = await EventModel.findAll({
        attributes: ["name"],
        where: { id: id },
        include: [{
            attributes: ["id_Contacts"],
            model: EventContactsModel,
            required: false,
            include: [{
                model: ContactsModel,
                required: true,
            }]
        }]
    });

    return res.status(201).json(eventContactsFind[0]);
});

eventContactRouter.get('/notContact', async (req: Request, res: Response) => {
    const { id }: iEventContact = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }
    });

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    var query = `select * from \"Contacts\" c `
        + `where id not in (select \"id_Contacts\" `
        + `from \"Event_Contacts\" ec `
        + `where ec.\"id_Event\" = '${id}')`;
    const users = await sequelize.query(query, { type: QueryTypes.SELECT });

    return res.status(201).json(users);
});

eventContactRouter.post('/addContacts', async (req: Request, res: Response) => {
    const { contacts }: iEventContact = req.body;
    const { id }: iEventContact = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }
    });

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    let controler = 0;
    let controlerError: string[];
    await Promise.all(contacts.map(async (contact) => {
        const model = {
            id_Event: id,
            id_Contacts: contact,
        };

        const contactFind = await ContactsModel.findOne({
            where: { id: model.id_Contacts }
        });

        if (!contactFind)
            return res.status(200).json({
                status: 401,
                message: "Contact not Found"
            });


        const contactEvent = await EventContactsModel.findOne({ where: model });
        if (!!contactEvent) {
            controler++;
            return;
        }

        const response = await EventContactsModel.create(model);
        if (!!response) {
            controler++;
            const paramsMail = {
                addressee: `${contactFind.email}`,
                subject: "Convite para participar de um evento",
                message: `Prabéns você foi convidade para participar do evento ${eventFind.name} na data ${eventFind.appointment}`,
            };
            sendEmail(paramsMail);
            return;
        }

        controlerError.push(contact);
        return;
    }));

    if (controler === contacts.length) {
        const eventContactsFind = await EventContactsModel.findAll({
            where: { id_Event: id }
        });

        return res.status(201).json(eventContactsFind);
    }

    return res.status(200).json({
        status: 401,
        message: "Not all contacts have been added",
        controlerError
    });

});

eventContactRouter.delete('/removeContacts', async (req: Request, res: Response) => {
    const { contacts }: iEventContact = req.body;
    const { id }: iEventContact = req.query;

    const eventFind = await EventModel.findOne({
        where: { id }
    });

    if (!eventFind)
        return res.status(200).json({
            status: 401,
            message: "Event not Found"
        });

    let controler = 0;
    let controlerError: string[];
    await Promise.all(contacts.map(async (contact) => {
        const model = {
            id_Event: id,
            id_Contacts: contact,
        };

        const contactEvent = await EventContactsModel.findOne({ where: model });
        if (!contactEvent) {
            controler++;
            return;
        }

        const response = await EventContactsModel.destroy({ where: model });

        if (!!response) {
            controler++;
            return;
        }

        controlerError.push(contact);
        return;
    }));

    if (controler === contacts.length) {
        const eventContactsFind = await EventContactsModel.findAll({
            where: { id_Event: id }
        });

        return res.status(201).json(eventContactsFind);
    }

    return res.status(200).json({
        status: 401,
        message: "Not all contacts have been added",
        controlerError
    });

});

export default eventContactRouter;
