"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../lib/keycloak";

const KeycloakContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init()
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed", error);
        setLoading(false); 
      });
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();
  const register = () => keycloak.register();

  return (
    <KeycloakContext.Provider
      value={{ keycloak, isAuthenticated, login, logout, register, loading }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloak = () => useContext(KeycloakContext);
