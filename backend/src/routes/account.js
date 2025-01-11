const express = require('express');
const router = express.Router();
const { getAccountBalance, updateAccountBalance } = require('../controllers/accountController');

router.get('/:id', getAccountBalance);
router.put('/:id/update', updateAccountBalance);

module.exports = router;
