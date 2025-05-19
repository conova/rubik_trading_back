import express from 'express';
import defaultRoute from '../routes/api/default.route';
import publicRoute from '../routes/public/public.route';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/api',
        route: defaultRoute,
    },
    {
        path: '/',
        route: publicRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
