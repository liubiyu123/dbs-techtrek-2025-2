import OutstandingRequest from '../models/requests';

import {Request, Response} from "express";

class AccountController {
  //  GET /:id (get account details)
  public getAccountDetails = async (req: Request, res: Response) => {
    try {
      res.status(201).json({message:"test"})
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to get account details', error: error});
    }
  }

  // PUT /update/:id (update account details)
  public updateAccountDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {cash } = req.body

      const requests = await OutstandingRequest.updateOne({ id, cash: cash });
      res.status(200).json({ data: requests });

    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch requests', error: error });
    }
  }
}

export default AccountController;
