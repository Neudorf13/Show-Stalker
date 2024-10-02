import { createContext, useEffect, useState } from 'react';

// Create a context for user data
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userID, setUserID] = useState(localStorage.getItem('userID') || null);
  const [savedShows, setSavedShows] = useState(JSON.parse(localStorage.getItem('savedShows')) || []);

  // Sync userID and savedShows with localStorage
  useEffect(() => {
    localStorage.setItem('userID', userID);
    localStorage.setItem('savedShows', JSON.stringify(savedShows));
  }, [userID, savedShows]);

  return (
    <AuthContext.Provider value={{ userID, setUserID, savedShows, setSavedShows }}>
      {children}
    </AuthContext.Provider>
  );
};
