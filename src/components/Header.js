"use client";

import { useKeycloak } from "@/context/KeycloakProvider";
import styles from "@/styles/header.module.css";

const Header = () => {
  const { isAuthenticated, login, logout, register, loading } = useKeycloak();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {loading ? null : isAuthenticated ? (
          <button onClick={logout} className={styles.logoutButton}>
            Log Out
          </button>
        ) : (
          <>
            <button onClick={login} className={styles.loginButton}>
              Login
            </button>
            <button onClick={register} className={styles.signupButton}>
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
