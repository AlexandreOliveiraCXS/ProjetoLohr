
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ListContact  from './pages/Contact/List';
import EditContact from './pages/Contact/Edit';
import NewContact from './pages/Contact/New';

import ListGroup from './pages/Group/List';
import EditGroup from './pages/Group/Edit';
import NewGroup from './pages/Group/New';
import DetailGroup from './pages/Group/Details';

import ListEvent from './pages/Event/List';
import EditEvent from './pages/Event/Edit';
import NewEvent from './pages/Event/New';
import DetailEvent from './pages/Event/Details';

const RoutesCustomer = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ListContact />} path="/contact" />
                <Route element={<EditContact />} path="/contact/edit/:id" />
                <Route element={<NewContact />} path="/contact/new" />

                <Route element={<ListGroup />} path="/group" />
                <Route element={<EditGroup />} path="/group/edit/:id" />
                <Route element={<NewGroup />} path="/group/new" />
                <Route element={<DetailGroup />} path="/group/detail/:id" />

                <Route element={<ListEvent />} path="/event" />
                <Route element={<EditEvent />} path="/event/edit/:id" />
                <Route element={<NewEvent />} path="/event/new" />
                <Route element={<DetailEvent />} path="/event/detail/:id" />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesCustomer;