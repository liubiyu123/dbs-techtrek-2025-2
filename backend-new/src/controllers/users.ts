import OutstandingRequest from '../models/requests';

import {Request, Response} from "express";

class UserController {
  //  POST /login
  public login = async (req: Request, res: Response) => {
    try {
      res.status(200).json({message:"Successfully logged in"})
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error});
    }
  }
}

export default UserController;
