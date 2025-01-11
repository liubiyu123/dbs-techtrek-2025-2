import OutstandingRequest from '../models/requests';

import {Request, Response} from "express";
import AccountModel from "@models/account";

class AccountController {
  //  GET /:id (get account details)
  public getAccountDetails = async (req: Request, res: Response) => {
    try {
      // Return the account information
      const {id} = req.params
      const account = await AccountModel.findOne({id})
      res.status(201).json({data: account})
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to get account details', error: error});
    }
  }

  // PUT /update/:id (update account details)
  public updateAccountDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const newData = req.body

      const updatedAccount = await AccountModel.findOneAndUpdate({ id}, newData);
      res.status(200).json({ data: updatedAccount });

    } catch (error) {
      res.status(500).json({ message: 'Failed to update account details', error: error });
    }
  }
}

export default AccountController;
