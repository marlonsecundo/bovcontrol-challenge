import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useIsOffline = () => {
  const [isOffline, setOfflineStatus] = useState(true);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);

      setOfflineStatus(!offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return isOffline;
};
