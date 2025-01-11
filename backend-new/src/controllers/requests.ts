import OutstandingRequest from '../models/requests';

import {Request, Response} from "express";

class RequestController {
  //  POST /create (create into outstanding requests & requests received - 4) 
  public createRequest = async (req: Request, res: Response) => {
    try {
      // const request = new OutstandingRequest(req.body);
      // const savedRequest = await request.save();
      res.status(201).json({ message: 'Request created successfully', data: req.body });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create request', error: error});
    }
  }

  // GET /:companyId (Get ALL for YOUR requests)
  public getAllCompanyRequests = async (req: Request, res: Response) => {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch requests', error: error });
    }
  }

  // GET /outstanding/:companyId (Display outstanding of YOUR requests - 3)
  public getOutstandingRequests = async (req: Request, res: Response) => {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId, status: 'outstanding' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch outstanding requests', error: error });
    }
  }

  // GET /incoming/:companyId (Display incoming of OTHER requests - 3)
  public getIncomingRequests = async (req: Request, res: Response) => {
    try {
      const { requestorCompanyId } = req.params;
      const requests = await OutstandingRequest.find({ requestorCompanyId, type: 'incoming' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch incoming requests', error: error });
    }
  }
  
  // PUT /edit/:requestId (Edit user’s company request)
  public editCompanyRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedRequest = await OutstandingRequest.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });

    } catch (error) {
      res.status(500).json({ message: 'Failed to update request', error: error });
    }
  }

  // DELETE /company/:requestId (Delete user’s company request)
  public deleteCompanyRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedRequest = await OutstandingRequest.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request deleted successfully' });
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete request', error: error });
    }
  }

  // PUT /incoming/update/:requestId (Accept/ Reject requests, DEFAULT: Pending)
  public updateCompanyRequest = async (req: Request, res: Response) => {
    try {
      const { requestId } = req.body;
      const updatedRequest = await OutstandingRequest.findByIdAndUpdate(requestId);

      if (!updatedRequest) {
        res.status(404).json({ message: 'Request does not exist.' });
      }

      res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });

    } catch (error) {
      res.status(500).json({ message: 'Failed to delete request', error: error });
    }
  }
}

export default RequestController;
