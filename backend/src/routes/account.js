const express = require('express');
const router = express.Router();
const { getAccountDetails, updateAccountBalance } = require('../controllers/accountController');

router.get('/account/:companyId', getAccountDetails);
router.put('/account/:companyId/update', updateAccountBalance);

module.exports = router;
