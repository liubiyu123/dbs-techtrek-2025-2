import {Request, Response} from "express";
import jwt from 'jsonwebtoken'

class UserController {
  private JWT_SECRET = '123'

  //  POST /login
  public login = async (req: Request, res: Response) => {
    try {
      const {userID, password} = req.body
      console.log(userID, password)
      if (userID === "testuser" && password === "testpassword") {

        const payload = { userID };

        // Generate a JWT
        const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
          message: "Successfully logged in",
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid userID or password" });
      }

      res.status(200).json({message:"Successfully logged in"})
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error});
    }
  }
}

export default UserController;
