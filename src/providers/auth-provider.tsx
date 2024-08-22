import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
const NEST_SERVER = import.meta.env.VITE_NEST_SERVER;

interface AuthContextType {
  token: string;
  user: UserType | null;
  signIn: (data: LoginDataType) => Promise<void>;
  logOut: () => void;
}

interface UserType {
  id: string;
  name: string;
  email: string;
}

interface LoginDataType {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      setToken(storedToken);
      // getCurrentUser(storedToken);
    }
  }, []);

  // const getCurrentUser = async (token: string) => {
  //   try {
  //     const response = await fetch(`${NEST_SERVER}/auth/user`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) throw new Error('Failed to fetch user data');
  //     const userData = await response.json();
  //     setUser(userData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signIn = async (data: LoginDataType) => {
    try {
      const response = await fetch(`${NEST_SERVER}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResponse = await response.json();

      if (dataResponse.account && dataResponse.token && dataResponse.token.token) {
        const { account, token } = dataResponse;

        setUser({
          id: account.id,
          name: account.name,
          email: account.email,
        });
        setToken(token.token);
        localStorage.setItem("site", token.token);
        navigate("/");

      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/authentication");
  };

  return (
    <AuthContext.Provider value={{ token, user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
