import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "./reducer";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token },
      });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
