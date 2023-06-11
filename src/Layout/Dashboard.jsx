import { Link, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";

const Dashboard = () => {
  
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  
  
  return (

    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-between">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {
            isAdmin &&<>
              <li><Link to="/dashboard/manageClass">Manage Classes</Link></li>
              <li><Link to="/dashboard/allUser">Manage Users</Link></li>
            </>
}
{
          
            isInstructor &&
              <>
                <li><Link to="/dashboard/myClass">My Class</Link></li>
                <li><Link to="/dashboard/addClass">Add Class</Link></li>
              </>
}
          {
            isStudent&&
            <>
              <li><Link>Selected Class</Link></li>
              <li><Link>Enrolled Class</Link></li>
            </>
            
          }





          <div className="divider"></div>
          <li><Link to='/'>Home</Link></li>



        </ul>

      </div>
    </div>
  );
};

export default Dashboard;