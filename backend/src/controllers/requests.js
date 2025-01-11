import RequestModel from "../models/requests";

class RequestController {
  /***
   *  Create new company requests into outstandingRequests & requestReceived tables
   */
  public createRequest = async () => {
    try{
      new RequestModel()
    }catch (e) {
      console.log(e)
    }
  }

  /***
   *  Get all requests made by the company
   */
  public getAllCompanyRequests = async () => {
    try{
      await RequestModel.findById()
    }catch (e) {
      console.log(e)
    }
  }

  /***
   *  Get incoming requests
   */
  public getIncomingRequests = () => {
    try{
      console.log("TEST")
    }catch (e) {
      console.log(e)
    }
  }

  public editCompanyRequest = () => {
    try{
      console.log("TEST")
    }catch (e) {
      console.log(e)
    }
  }

  public deleteCompanyRequest = () => {
    try{
      console.log("TEST")
    }catch (e) {
      console.log(e)
    }
  }
}