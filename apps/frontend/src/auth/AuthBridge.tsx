import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import {
  resetShowRepositoryCache,
  setShowRepositoryAuthTokenProvider,
} from "../repositories/showRepository";

export const AuthBridge = () => {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    setShowRepositoryAuthTokenProvider(() => getToken());

    return () => {
      setShowRepositoryAuthTokenProvider(null);
    };
  }, [getToken]);

  useEffect(() => {
    resetShowRepositoryCache();
  }, [userId]);

  return null;
};
