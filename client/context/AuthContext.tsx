import React, { useState, useEffect, useCallback } from 'react';
import { loginWithLN } from '../api';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';
const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

interface LNData {
  encoded: string;
  secret: string;
  url: string;
  key: string;
}

interface Props {
  children: React.ReactNode;
}

interface IAuthContext {
  handleLoginWithLN: () => void;
  lnData: LNData;
}

const defaultState = {
  handleLoginWithLN: () => {},
  lnData: {encoded: "", secret: "", url: "", key: ""}
};

export const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({ children }: Props) => {
  const [lnData, setLnData] = useState(defaultState.lnData);

   const router = useRouter();

  useEffect(() => {
    const getEventsSocket = () => {
      socket.on('auth', (data: any) => {
        if (data.key) {
          let lndata = lnData
          lndata.key = data.key
          setLnData(lndata)
          router.push('/dashboard/');
        }
      });
    };
    getEventsSocket()
  }, [router]);

  const handleLoginWithLN = async () => {
    let response = await loginWithLN();
    setLnData(response.data)
  }

  const contextValue = {
    lnData,
    handleLoginWithLN,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};