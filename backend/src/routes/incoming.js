import express from 'express';

const router = express.Router();
const requestController = new RequestController()

router.post('/create', requestController.createRequest)

router.get('/company/', requestController.getAllCompanyRequests)

router.get('/company/:companyId', requestController.getCompanyRequests)

router.put('/company/:requestId', requestController.editCompanyRequest)

router.delete('/company/:requestId', requestController.deleteCompanyRequest)

export default router;