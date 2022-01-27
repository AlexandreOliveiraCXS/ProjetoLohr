import { Router, Request, Response } from 'express';
import cors from 'cors';
import contactRouter from './contact.router';
import groupRouter from './group.router';
import eventRouter from './event.router';
import eventContactRouter from './eventContacts.router';
import groupContactRouter from './groupContacts.router';

const routes = Router();

routes.use(cors());

routes.use('/contact', contactRouter);
routes.use('/group', groupRouter);
routes.use('/event', eventRouter);
routes.use('/eventContacts', eventContactRouter);
routes.use('/groupContacts', groupContactRouter);

export default routes;