import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem("uid") || null
    });
    const [currentUserId, setCurrentUserId] = useState(() => {
        return localStorage.getItem("id") || null
    });
    const [currentUserEmail, setCurrentUserEmail] = useState(() => {
        return localStorage.getItem("email") || null
    });

    return (
        <AuthContext.Provider
            value={{
                currentUser, setCurrentUser,
                currentUserId, setCurrentUserId,
                currentUserEmail, setCurrentUserEmail
            }}
        >
            {children}
        </AuthContext.Provider>
    )
    
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
