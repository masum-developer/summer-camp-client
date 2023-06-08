import { Link } from "react-router-dom";

const NavBar = () => {
    const user = {
        displayName: 'masum',
        photoURL: ''
    };
    const navItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/instructors-page'>Instructors</Link></li>
            <li><Link to='/classes-page'>Classes</Link></li>
            {
                user && <li><Link to='/dashboard'>Dashboard</Link></li>
            }


        </>
    const handleLogOut = () => {

    }
    return (
        <div className="navbar bg-base-100 h-28 mb-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/'>
                    <h2>Martial Academy</h2>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                    <>
                        <img title={user?.displayName} className="w-10 h-10 rounded-large" src={user.photoURL} alt="" />                    <button className="btn btn-black ml-3" onClick={handleLogOut}>LogOut</button>

                    </> : <Link className="btn btn-black" to='/login'>Login</Link>
                }

            </div>
        </div>
    );
};

export default NavBar;