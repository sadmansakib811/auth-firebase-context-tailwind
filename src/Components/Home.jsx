import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProver';

const Home = () => {
    const user = useContext(AuthContext)
    return (
        <div>
            <h1>this is Home {user && <span>{user.displayName}</span> }</h1>
        </div>
    );
};

export default Home;