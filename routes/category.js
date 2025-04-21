const { Router } = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT');
const { create, views, update, destroy, show } = require('../controllers/category');
const router = Router();

router.get('/views', authenticateJWT, views)
router.post('/create', authenticateJWT, create);
router.post('/update', authenticateJWT, update);
router.post('/delete', authenticateJWT, destroy);
router.get('/show', authenticateJWT, show);


module.exports = router;