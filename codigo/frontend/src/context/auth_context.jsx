import { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

// Nombres de las keys para consistencia
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const LAST_ACTIVITY_KEY = 'last_activity';

export function AuthProvider({ children }) {
  const [token, set_token] = useState(null);
  const [user, set_user] = useState(null);
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    //Intentar recuperar desde Cookies
    const saved_token = Cookies.get(TOKEN_KEY);
    const saved_user = Cookies.get(USER_KEY);
    const last_activity = Cookies.get(LAST_ACTIVITY_KEY);

    //verificar token
    if (saved_token && saved_user) {
      try {
        set_token(saved_token);
        set_user(JSON.parse(saved_user));
      } catch (error) {
        console.error("Error al parsear usuario", error);
        logout(); 
      }
    }

    set_loading(false);
  }, []);

  const login = (new_token, new_user) => {
    set_token(new_token);
    set_user(new_user);

    // Guardar en Cookies 
    const cookieOptions = { 
      expires: 1,       
      secure: true,     
      sameSite: 'Lax' 
    };

    Cookies.set(TOKEN_KEY, new_token, cookieOptions);
    Cookies.set(USER_KEY, JSON.stringify(new_user), cookieOptions);
    Cookies.set(LAST_ACTIVITY_KEY, Date.now().toString(), cookieOptions);
  };

  const logout = () => {
    set_token(null);
    set_user(null);

    // Limpiar todas las cookies relacionadas
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(USER_KEY);
    Cookies.remove(LAST_ACTIVITY_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}