"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRefresh, setUserRefresh] = useState(null);
  const [userdetails, setUserdetails] = useState(null);
  const [transactionsauth, setTransactionsauth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const { toast } = useToast();
  // Use useCallback to memoize these functions
  const REFRESHTOKEN = async () => {
    if (!userRefresh) return;
    setIsRefreshing(true);
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
      if (data.success) {
        Cookies.set("accesstoken", data.data.accessToken, {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("refreshtoken", data.data.refreshToken, {
          secure: true,
          sameSite: "strict",
        });
        setUser(data.data.accessToken);
        setUserRefresh(data.data.refreshToken);
      }
    } catch (error) {
      console.log("error refreshing access token", error);
    } finally {
      setIsRefreshing(false);
    }
  };
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

  const deleteTransaction = async (id) => {
    if (!user) return;
    console.log("context", id);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_PATH}/transactions/removetransaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId: id }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        fetchtransactionDetails();
      } else {
        console.log("Failed to delete transaction:", data.message);
      }
    } catch (error) {
      console.log("Error deleting transaction:", error);
    }
  };

  const editTransaction = async (id, data) => {
    if (!user) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_PATH}/transactions/edittransaction`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId: id, ...data }),
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        fetchtransactionDetails();
      } else {
        toast({
          title: "Failed to edit transaction",
          description: responseData.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error editing transaction",
        description: error.message,
      });
    }
  };
  const logout = () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
    setUser(null);
    setUserdetails(null);
    setTransactionsauth([]);
    router.push("/");
  };

  // Load token from cookies on mount
  useEffect(() => {
    const storedUser = Cookies.get("accesstoken");
    setUser(storedUser);
  }, [user]);

  useEffect(() => {
    const storedRefresh = Cookies.get("refreshtoken");
    setUserRefresh(storedRefresh);
  }, [user]);

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
    isRefreshing,
    editTransaction,
    logout,
    fetchtransactionDetails,
    deleteTransaction, // Expose this so components can refresh transactions
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
