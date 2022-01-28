import { Router, Request, Response } from 'express';
import ContactsModel from '../../database/models/contacts';
import GroupContactsModel from '../../database/models/groupContacts';
import GroupModel from '../../database/models/groups';
import { QueryTypes } from 'sequelize';
import sequelize from '../../database';

const groupContactRouter = Router();

interface iGroupContact {
    id?: string,
    contacts?: string[]

}

groupContactRouter.get('/', async (req: Request, res: Response) => {
    const { id }: iGroupContact = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }
    });

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    const groupContactsFind = await GroupModel.findAll({
        attributes: ["name"],
        where: { id: id },
        include: [{
            attributes: ["id_Contacts"],
            model: GroupContactsModel,
            required: false,
            include: [{
                model: ContactsModel,
                required: true,
            }]
        }]
    });

    return res.status(201).json(groupContactsFind[0]);
});

groupContactRouter.get('/notContact', async (req: Request, res: Response) => {
    const { id }: iGroupContact = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }
    });

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    var query = `select * from \"Contacts\" c `
        + `where id not in (select \"id_Contacts\" `
        + `from \"Group_Contacts\" gc `
        + `where gc.\"id_Group\" = '${id}')`;
    const users = await sequelize.query(query, { type: QueryTypes.SELECT });

    return res.status(201).json(users);
});

groupContactRouter.post('/addContacts', async (req: Request, res: Response) => {
    const { contacts }: iGroupContact = req.body;
    const { id }: iGroupContact = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }
    });

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    let controler = 0;
    let controlerError: string[];
    await Promise.all(contacts.map(async (contact) => {
        const model = {
            id_Group: id,
            id_Contacts: contact,
        };

        const contactGroup = await GroupContactsModel.findOne({ where: model });
        if (!!contactGroup) {
            controler++;
            return;
        }

        const response = await GroupContactsModel.create(model);
        if (!!response) {
            controler++;
            return;
        }

        controlerError.push(contact);
        return;
    }));

    if (controler === contacts.length) {
        const groupContactsFind = await GroupContactsModel.findAll({
            where: { id_Group: id }
        });

        return res.status(201).json(groupContactsFind);
    }

    return res.status(200).json({
        status: 401,
        message: "Not all contacts have been added",
        controlerError
    });

});

groupContactRouter.delete('/removeContacts', async (req: Request, res: Response) => {
    const { contacts }: iGroupContact = req.body;
    const { id }: iGroupContact = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }
    });

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    let controler = 0;
    let controlerError: string[];
    await Promise.all(contacts.map(async (contact) => {
        const model = {
            id_Group: id,
            id_Contacts: contact,
        };

        const groupContact = await GroupContactsModel.findOne({ where: model });
        if (!groupContact) {
            controler++;
            return;
        }

        const response = await GroupContactsModel.destroy({ where: model });

        if (!!response) {
            controler++;
            return;
        }

        controlerError.push(contact);
        return;
    }));

    if (controler === contacts.length) {
        const groupContactsFind = await GroupContactsModel.findAll({
            where: { id_Group: id }
        });

        return res.status(201).json(groupContactsFind);
    }

    return res.status(200).json({
        status: 401,
        message: "Not all contacts have been added",
        controlerError
    });

});

export default groupContactRouter;
