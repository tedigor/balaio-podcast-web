import React, { useContext } from "react";

import SecurityContext from '../../../contexts/SecurityContext'

const Sidenav = ({ children }) => {

    const { isUserAuthenticated, isUserAdmin } = useContext(SecurityContext);
    const userAuthenticated = isUserAuthenticated();
    const userAdmin = isUserAdmin();
    
    return userAuthenticated && userAdmin ?
        <main>
            {children}
        </main>
        : (children);
}

export default Sidenav;