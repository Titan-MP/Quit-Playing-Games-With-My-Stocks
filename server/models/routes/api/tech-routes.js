const router = require('express').Router();
const { getAllTech } = require('../../controllers/tech-controller');

router.route('/').get(getAllTech);

module.exports = router;
