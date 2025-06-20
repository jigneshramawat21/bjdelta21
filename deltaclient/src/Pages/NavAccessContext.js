// NavAccessContext.js
import React, { createContext, useState } from "react";

export const NavAccessContext = createContext();

export const NavAccessProvider = ({ children }) => {
  const [allowedRoute, setAllowedRoute] = useState("/");

  return (
    <NavAccessContext.Provider value={{ allowedRoute, setAllowedRoute }}>
      {children}
    </NavAccessContext.Provider>
  );
};
