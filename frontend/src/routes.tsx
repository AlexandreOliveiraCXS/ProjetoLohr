
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ListContact  from './pages/Contact/List';
import EditContact from './pages/Contact/Edit';
import NewContact from './pages/Contact/New';

import ListGroup from './pages/Group/List';
import EditGroup from './pages/Group/Edit';
import NewGroup from './pages/Group/New';

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
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesCustomer;