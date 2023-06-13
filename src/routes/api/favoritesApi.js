const router = require('express').Router();
const { getFavorites,toggleProductFavorite  } = require('../../controllers/api/favoritesApiController');

/* /api/favorites */

router.get('/', getFavorites);
router.post('/toggle', toggleProductFavorite);

module.exports = router;
