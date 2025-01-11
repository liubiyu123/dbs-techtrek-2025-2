import express from 'express';
import { createRequest, deleteCompanyRequest, editCompanyRequest, getAllCompanyRequests, getIncomingRequests, getOutstandingRequests } from "../controllers/requests";

const router = express.Router();

router.post('/create', createRequest)

router.get('/:companyId', getAllCompanyRequests)

router.get('/outstanding/:companyId', getOutstandingRequests)

router.get('/incoming/:companyId', getIncomingRequests)

// router.put('/incoming/update', editCompanyRequest)

// router.put('/edit/:requestId', editCompanyRequest)

// router.delete('/:requestId', deleteCompanyRequest)

export default router;