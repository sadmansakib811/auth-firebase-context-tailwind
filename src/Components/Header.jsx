import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProver';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleLogOut = ()=>{
        logOut()
        .then(() => {
            // Sign-out successful.
            // alert('Sign-out successful.')
          })
          .catch((error) => {
            // An error happened.
            alert('An error happened.')
          });
          
    }
    return (
        <div>
            <div className="navbar bg-primary text-primary-content">
              <a className="btn btn-ghost normal-case text-xl">AuthMaster</a>
              <Link className="btn btn-ghost normal-case text-xl" to='/'>Home</Link>
              <Link className="btn btn-ghost normal-case text-xl" to='/order'>Orders</Link>
              <Link className="btn btn-ghost normal-case text-xl" to='/login'>Login</Link>
              <Link className="btn btn-ghost normal-case text-xl" to='/register'>Register</Link>
              {
                user? <>
                <span>{user.email}</span>
                <span> <button onClick={handleLogOut} className='btn btn-xs'>Sign Out</button> </span>
                </>:  <Link to='/login'>Login</Link>
            }
            </div>
            
        </div>
    );
};

export default Header;