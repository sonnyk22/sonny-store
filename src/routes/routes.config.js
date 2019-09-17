// ===============================================================================
// Imported Feature (Core)
import { PageNotFound, InternalServerError } from '../core';

// ===============================================================================
// Imported Components
import { App, Category, Cart } from '../components';

//*********************************************************
//*****                   Constants                   *****
//*********************************************************
const routes = [
    {
        path: '/',
        name: 'App',
        exact: true,
        component: App
    },
    {
        path: '/category',
        name: 'Category',
        exact: false,
        component: Category
    },
    {
        path: '/cart',
        name: 'Cart',
        exact: false,
        component: Cart
    },
    {
        path: '/error',
        name: 'Error',
        exact: false,
        component: InternalServerError
    },
    {
        path: null,
        name: 'PageNotFound',
        exact: false,
        component: PageNotFound
    }
];

export default routes;