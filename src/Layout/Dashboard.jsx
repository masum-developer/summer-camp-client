import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">

                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-info">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80">
                    
                        
                            <li><Link>Home</Link></li>
                         
                        
                            <div className="divider"></div>
                            <li>nnnnn</li>
                            
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;