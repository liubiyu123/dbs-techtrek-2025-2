import express from 'express';
import AccountController from "../controllers/accounts";

const router = express.Router();
const accountController = new AccountController()

router.get('/create', accountController.getAccountDetails)

router.put('/:companyId', accountController.updateAccountDetails)

export default router;