import express from 'express';
import RequestController from "../controllers/requests.js";

const router = express.Router();
const requestController = new RequestController()

router.post('/create', requestController.createRequest)

router.get('/:companyId', requestController.getAllCompanyRequests)

router.get('/outstanding/:companyId', requestController.getOutstandingRequests)

router.get('/incoming/:companyId', requestController.getIncomingRequests)

router.put('/incoming/update', requestController.editCompanyRequest)

router.put('/edit/:requestId', requestController.editCompanyRequest)

router.delete('/:requestId', requestController.deleteCompanyRequest)

export default router;