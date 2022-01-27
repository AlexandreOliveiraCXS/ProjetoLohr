import { Router, Request, Response } from 'express';
import generateUniqueId from '../../../useful/generateId';
import ContactsModel from '../../database/models/contacts';

const contactRouter = Router();

interface iContact {
    id?: string,
    name?: string,
    cel_phone?: string,
    email?: string
}

contactRouter.post('/new', async (req: Request, res: Response) => {
    const { name, cel_phone, email }: iContact = req.body;

    const [fristName, lastName] = name.split(' ');

    const contactFind = await ContactsModel.findOne({
        where:
        {
            name: fristName,
            last_Name: lastName,
        }

    });
    if (contactFind)
        return res.status(200).json({
            status: 401,
            message: "Contact already exists"
        });

    const contact = await ContactsModel.create({
        id: generateUniqueId(),
        name: fristName,
        last_Name: lastName,
        cel_Phone: cel_phone,
        email

    });

    return res.status(201).json(contact);
});

contactRouter.put('/edit', async (req: Request, res: Response) => {
    const { name, cel_phone, email }: iContact = req.body;
    const { id }: iContact = req.query;
console.log(req)      
    const [fristName, lastName] = name.split(' ');

    const contactFind = await ContactsModel.findOne({
        where: { id }
    });

    if (!contactFind)
        return res.status(200).json({
            status: 401,
            message: "Contact not Found"
        });

    var contact = {
        name: fristName,
        last_Name: lastName,
        cel_Phone: cel_phone,
        email
    }

    const contactEdit = await ContactsModel.update(contact, {
        where: {
            id
        }
    });

    return res.status(201).json(contactEdit);
});

contactRouter.get('/all', async (req: Request, res: Response) => {
    const contactFind = await ContactsModel.findAll();

    if (!contactFind)
        return res.status(200).json({
            status: 401,
            message: "No base contacts"
        });


    return res.status(201).json(contactFind);
});

contactRouter.delete('/delete', async (req: Request, res: Response) => {
    const { id }: iContact = req.query;

    const contactFind = await ContactsModel.findOne({
        where:
        {
            id
        }

    });
    if (!contactFind)
        return res.status(200).json({
            status: 401,
            message: "Contact not Found"
        });

    const contact = await ContactsModel.destroy({
        where:
        {
            id
        }
    });

    return res.status(202).json(contact);
});

contactRouter.get('/', async (req: Request, res: Response) => {
    const { id }: iContact = req.query;

    const contactFind = await ContactsModel.findOne({
        where:
        {
            id
        }

    });
    if (!contactFind)
        return res.status(200).json({
            status: 401,
            message: "Contact not Found"
        });

    const contact = await ContactsModel.findOne({
        where:
        {
            id
        }
    });

    return res.status(202).json(contact);
});

export default contactRouter;
