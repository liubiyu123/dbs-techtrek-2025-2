import OutstandingRequest from '../models/OutstandingRequest';

class RequestController {

  //  POST /create (create into outstanding requests & requests received - 4) 
  async createRequest(req, res) {
    try {
      const request = new OutstandingRequest(req.body);
      const savedRequest = await request.save();
      res.status(201).json({ message: 'Request created successfully', data: savedRequest });
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to create request', error: error.message });
    }
  }

  // GET /:companyId (Get ALL for YOUR requests)
  async getAllCompanyRequests(req, res) {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch requests', error: error.message });
    }
  }

  // GET /outstanding/:companyId (Display outstanding of YOUR requests - 3)
  async getOutstandingRequests(req, res) {
    try {
      const { companyId } = req.params;
      const requests = await OutstandingRequest.find({ companyId, status: 'outstanding' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch outstanding requests', error: error.message });
    }
  }

  // GET /incoming/:companyId (Display incoming of OTHER requests - 3)
  async getIncomingRequests(req, res) {
    try {
      const { requestorCompanyId } = req.params;
      const requests = await OutstandingRequest.find({ requestorCompanyId, type: 'incoming' });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch incoming requests', error: error.message });
    }
  }
  
  // PUT /edit/:requestId (Edit user’s company request)
  async editCompanyRequest(req, res) {
    try {
      const { id } = req.params;
      const updatedRequest = await OutstandingRequest.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request updated successfully', data: updatedRequest });

    } catch (error) {
      res.status(500).json({ message: 'Failed to update request', error: error.message });
    }
  }

  // DELETE /company/:requestId (Delete user’s company request)
  async deleteCompanyRequest(req, res) {
    try {
      const { id } = req.params;
      const deletedRequest = await OutstandingRequest.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).json({ message: 'Request not found' });
      }

      res.status(200).json({ message: 'Request deleted successfully' });
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete request', error: error.message });
    }
  }

  // PUT /incoming/update (Accept/ Reject requests, DEFAULT: Pending)
}

export default RequestController;
