import express from 'express';
const router = express.Router();


router.get('/login', (res, req) => {
    res.send('auth main')
});

export default router;