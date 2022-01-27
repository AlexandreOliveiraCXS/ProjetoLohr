import { Router, Request, Response } from 'express';
import generateUniqueId from '../../../useful/generateId';
import GroupModel from '../../database/models/groups';

const groupRouter = Router();

interface iGroup {
    id?: string,
    name?: string,

}

groupRouter.post('/new', async (req: Request, res: Response) => {
    const { name }: iGroup = req.body;

    const groupFind = await GroupModel.findOne({
        where: { name }
    });

    if (groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group already exists"
        });

    const group = await GroupModel.create({
        id: generateUniqueId(),
        name
    });

    return res.status(201).json(group);
});

groupRouter.get('/all', async (req: Request, res: Response) => {
    const groupFind = await GroupModel.findAll();

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "No base group"
        });

    return res.status(201).json(groupFind);
});

groupRouter.get('/', async (req: Request, res: Response) => {
    const { id }: iGroup = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }

    });
    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    const group = await GroupModel.findOne({
        where: { id }
    });

    return res.status(202).json(group);
});

groupRouter.put('/edit', async (req: Request, res: Response) => {
    const { name }: iGroup = req.body;
    const { id }: iGroup = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }
    });

    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    var group = {
        name
    }

    const groupEdit = await GroupModel.update(group, {
        where: {
            id
        }
    });

    return res.status(201).json(groupEdit);
});

groupRouter.delete('/delete', async (req: Request, res: Response) => {
    const { id }: iGroup = req.query;

    const groupFind = await GroupModel.findOne({
        where: { id }

    });
    if (!groupFind)
        return res.status(200).json({
            status: 401,
            message: "Group not Found"
        });

    const group = await GroupModel.destroy({
        where: { id }
    });

    return res.status(202).json(group);
});


export default groupRouter;
