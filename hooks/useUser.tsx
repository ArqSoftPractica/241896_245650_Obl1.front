import { useEffect, useState } from 'react';
import router from 'next/router';
import { User } from 'src/interfaces/User';

interface UseUserProps {
  redirectTo?: string;
  allowedRoles: string[];
}

const useUser = ({ redirectTo = '/login', allowedRoles }: UseUserProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const parsedUser: User = userInfo ? JSON.parse(userInfo) : null;

    if (!parsedUser) {
      router.push('/login');
      return;
    }

    if (allowedRoles) {
      const isUserTypeAuthorized = allowedRoles.length > 0 && allowedRoles.includes(parsedUser.role);

      if (!isUserTypeAuthorized) {
        router.push(redirectTo);
        return;
      }
    }

    setUser(parsedUser);
  }, [allowedRoles, redirectTo]);

  return { user };
};

export default useUser;
