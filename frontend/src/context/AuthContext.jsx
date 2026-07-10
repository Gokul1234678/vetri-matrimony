import {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import api from "../services/api";

// ==============================
// Create Context
// ==============================

const AuthContext = createContext();

// ==============================
// Auth Provider
// ==============================

function AuthProvider({ children }) {

    // ==============================
    // States
    // ==============================

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==============================
    // Computed State
    // ==============================

    const isAuthenticated = user !== null;

    // ==============================
    // Load Current User
    // ==============================

    const loadUser = async () => {
        setLoading(true);
        try {

            const { data } = await api.get("/me");

            if (data.success) {

                setUser(data.user);

            }

        }

        catch (error) {

            setUser(null);

        }

        finally {

            setLoading(false);

        }

    };
    // ==============================
    // Login
    // ==============================

    const login = async (credentials) => {

        try {

            const { data } = await api.post(

                "/login",

                credentials

            );

            await loadUser();

            return data;

        }

        catch (error) {

            throw error;

        }

    };

    // ==============================
    // Logout
    // ==============================

    const logout = async () => {

        try {

            await api.post("/logout");

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setUser(null);

            setLoading(false);

        }
    };

    // ==============================
    // Load User On App Start
    // ==============================

    useEffect(() => {

        loadUser();

    }, []);

    // ==============================
    // Context Value
    // ==============================

    const value = {

        user,

        loading,

        isAuthenticated,

        login,

        logout,

        loadUser

    };

    // ==============================
    // Provider
    // ==============================

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

// ==============================
// Custom Hook
// ==============================

export function useAuth() {

    return useContext(AuthContext);

}

// ==============================
// Export Provider
// ==============================

export { AuthProvider };