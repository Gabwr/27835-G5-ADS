import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const INACTIVITY_TIMEOUT = 50 * 60 * 1000; 
const LAST_ACTIVITY_KEY = 'last_activity';
const TOKEN_KEY = 'auth_token'; 

export function use_inactivity_timeout() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const timeout_ref = useRef(null);

  // Leer y actualizar última actividad
  const updateLastActivity = useCallback(() => {
    Cookies.set(LAST_ACTIVITY_KEY, Date.now().toString(), { 
      expires: 1,        // 1 día de vida
      sameSite: 'Lax', 
      secure: true       // usa true en producción (HTTPS)
    });
  }, []);

  const checkInactivity = useCallback(() => {
    const lastActivity = Cookies.get(LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;

    const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
    return timeSinceLastActivity > INACTIVITY_TIMEOUT;
  }, []);

const logoutDueToInactivity = useCallback(() => {
    Cookies.remove(LAST_ACTIVITY_KEY);
    Cookies.remove(TOKEN_KEY); 
    logout();
    navigate('/login');
    // Quité el alert para evitar bloqueos de renderizado, 
    // puedes manejar el mensaje en la pantalla de login
  }, [logout, navigate]);

  // Resetear timer
  const reset_timer = useCallback(() => {
    if (timeout_ref.current) {
      clearTimeout(timeout_ref.current);
    }

    if (token) {
      timeout_ref.current = setTimeout(() => {
        if (checkInactivity()) {
          logoutDueToInactivity();
        }
      }, INACTIVITY_TIMEOUT);
    }
  }, [token, checkInactivity, logoutDueToInactivity]);

useEffect(() => {
    if (!token) return;

    const handler = () => {
      updateLastActivity();
      reset_timer();
    };

    // Eventos de actividad
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(e => window.addEventListener(e, handler));

    events.forEach(event => window.addEventListener(event, handler));

    // Inicializar
    updateLastActivity();
    reset_timer();

    return () => events.forEach(e => window.removeEventListener(e, handler));
  }, [token, updateLastActivity, reset_timer]);

  // Extra: Verificar inactividad al volver a la pestaña (mejora importante)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && token) {
        if (checkInactivity()) {
          logoutDueToInactivity();
        } else {
          reset_timer();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [token, checkInactivity, logoutDueToInactivity, reset_timer]);
}