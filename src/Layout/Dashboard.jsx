import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = false;
  const isInstructor = true
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
            isAdmin ? <>
              <li><Link to="/dashboard/allUser">All User</Link></li>
            </>
              : isInstructor ?
                <><li><Link>My Class</Link></li></>
                : <>
                  <li><Link>Student</Link></li>
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