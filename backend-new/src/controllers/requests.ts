import OutstandingRequest from '../models/OutstandingRequest';
import { Request, Response, NextFunction } from 'express';

export async function createRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("Request body:", req.body);

    const { id, companyId, requestorCompanyId, carbonUnitPrice, carbonQuantity, requestReason, requestStatus, requestType } = req.body;

    // Assuming OutstandingRequest is a Mongoose model
    const newRequest = new OutstandingRequest({
      id,
      companyId,
      requestorCompanyId,
      carbonUnitPrice,
      carbonQuantity,
      requestReason,
      requestStatus,
      requestType,
    });

    const createdRequest = await newRequest.save();
    res.status(201).json({ message: 'Request created successfully', data: createdRequest });
  } catch (error) {
    console.error("Error creating request:", error);
    next(error); // Pass the error to the Express error handler
  }
}

  // GET /:companyId (Get ALL for YOUR requests)
  export async function getAllCompanyRequests(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch requests', error });
    }
  }

  // GET /outstanding/:companyId (Display outstanding of YOUR requests - 3)
  export async function getOutstandingRequests(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId, status: 'outstanding' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch outstanding requests', error });
    }
  }

  // GET /incoming/:companyId (Display incoming of OTHER requests - 3)
  export async function getIncomingRequests(req: Request, res: Response) {
    try {
      const { requestorCompanyId } = req.params;
      const requests = await OutstandingRequest.find({ requestorCompanyId, type: 'incoming' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch incoming requests', error});
    }
  }
  
  // PUT /edit/:requestId (Edit user’s company request)
  export async function editCompanyRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedRequest = await OutstandingRequest.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });

    } catch (error) {
      res.status(500).json({ message: 'Failed to update request', error});
    }
  }

  // DELETE /company/:requestId (Delete user’s company request)
  export async function deleteCompanyRequest(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedRequest = await OutstandingRequest.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request deleted successfully' });
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete request', error});
    }
  }

  // PUT /incoming/update (Accept/ Reject requests, DEFAULT: Pending)
