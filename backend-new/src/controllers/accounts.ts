import OutstandingRequest from '../models/requests';

import {Request, Response} from "express";
import AccountModel from "../models/account";

class AccountController {
  //  GET /:id (get account details)
  public getAccountDetails = async (req: Request, res: Response) => {
      const {companyId} = req.params
    try {
      // Return the account information
      console.log(`Attempting to retrieve ${companyId}`)

      const account = await AccountModel.findOne({companyId})
      res.status(201).json({data: account})
      
    } catch (error) {
      res.status(500).json({ message: `Failed to get account details for ${companyId}`, error: error});
    }
  }

  // PUT /update/:id (update account details)
  public updateAccountDetails = async (req: Request, res: Response) => {
    const { companyId } = req.params;
    try {
      const newData = req.body
      console.log(`Updating account: ${companyId}`)

      const updatedAccount = await AccountModel.findOneAndUpdate({ companyId}, newData);
      res.status(200).json({ data: updatedAccount });

    } catch (error) {
      res.status(500).json({ message: `Failed to update account details for ${companyId}`, error: error });
    }
  }
}

export default AccountController;
