import React, { useState, useEffect } from 'react';
import { loginWithLN, pusherKey, pusherChannel, pusherCluster} from '../api';
import { useRouter } from 'next/router';

import Pusher from 'pusher-js';

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
      const pusher = new Pusher(pusherKey!,{
        cluster: pusherCluster!
      });
      
      const channel =  pusher.subscribe(pusherChannel!)
      
      channel.bind("auth", function(data:any) {
        if (data.key) {
          let lndata = lnData
          lndata.key = data.key
          setLnData(lndata)
          router.push('/dashboard/');
        }
      })

      return (() => {
        pusher.unsubscribe('lnd-auth')
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    getEventsSocket()
  }, []);

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