"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRefresh, setUserRefresh] = useState(null);
  const [userdetails, setUserdetails] = useState(null);
  const [transactionsauth, setTransactionsauth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Use useCallback to memoize these functions
  const fetchUserDetails = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_PATH}/users/userprofile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setUserdetails(data.data.user);
      } else {
        REFRESHTOKEN();
        console.log("Failed to fetch user details:", data.message);
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  }, [user]);

  const fetchtransactionDetails = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_PATH}/transactions/usertransactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log("apidata", data);
      if (data.success) {
        setTransactionsauth(data.data.transactions);
      } else {
        console.log("Failed to fetch transaction details:", data.message);
      }
    } catch (error) {
      console.log("Error fetching transaction details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const REFRESHTOKEN = async () => {
    if (!userRefresh) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_PATH}/users/refresh-token`,
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: userRefresh }),
        }
      );

      const data = await response.json();
      console.log(data);
      if(data.success){
        localStorage.setItem("accesstoken", data.data.accessToken);
        localStorage.setItem("refreshtoken", data.data.refreshToken);
        setUser(data.data.accessToken);
        setUserRefresh(data.data.refreshToken);
      }

    } catch (error) {
      console.log("error refreshing access token", error);
    }
  };
  const logout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    setUser(null);
    setUserdetails(null);
    setTransactionsauth([]);
    router.push("/");
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("accesstoken");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const storedRefresh = localStorage.getItem("refreshtoken");
    setUserRefresh(storedRefresh);
  }, []);

  // Fetch user details when user token changes
  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, fetchUserDetails]);
  // Fetch transactions when user token changes
  useEffect(() => {
    if (user) {
      fetchtransactionDetails();
    }
  }, [user, fetchtransactionDetails]);

  const contextValue = {
    user,
    userdetails,
    transactionsauth,
    isLoading,
    logout,
    fetchtransactionDetails, // Expose this so components can refresh transactions
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
