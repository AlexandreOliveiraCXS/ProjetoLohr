import { Router, Request, Response } from 'express';
import cors from 'cors';
import contactRouter from './contact.router';
import groupRouter from './group.router';
import eventRouter from './event.router';

const routes = Router();

routes.use(cors());

routes.use('/contact', contactRouter);
routes.use('/group', groupRouter);
routes.use('/event', eventRouter);

export default routes;