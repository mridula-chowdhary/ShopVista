import { useState,  useContext, createContext } from "react";


const AuthContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
   keyword:" ",
   results:[],
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(AuthContext);

export { useSearch,SearchProvider};