import { useEffect, useState } from 'react';
import router from 'next/router';

const useSession = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
      return;
    }
    setAuthorized(true);
  }, []);

  return { authorized };
};

export default useSession;
