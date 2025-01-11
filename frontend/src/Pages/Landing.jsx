import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state.userID;

  return (
    <div className='container'>
      <div className='banner-container'>
        <div className='banner'>
          <h2>CompanyID: {id}</h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
