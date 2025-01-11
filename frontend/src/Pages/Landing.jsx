import { Link } from 'react-router-dom';
import RequestTable from '../components/RequestTable';

const Landing = () => {
	return (
		<div className="container">
			<div className="banner-container">
				<div className="banner">
					<h2>Landing page</h2>
					<RequestTable/>
				</div>
			</div>
		</div>
	);
};

export default Landing;