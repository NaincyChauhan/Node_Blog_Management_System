const { Router } = require('express');
const authenticateJWT = require('../middlewares/authenticateJWT');
const { create, views, update, destroy, show } = require('../controllers/blog');
const router = Router();

router.get('/views', authenticateJWT, views)
router.post('/create', authenticateJWT, create);
router.post('/update/:id', authenticateJWT, update);
router.delete('/delete/:id', authenticateJWT, destroy);
router.get('/show/:id', authenticateJWT, show);


module.exports = router;