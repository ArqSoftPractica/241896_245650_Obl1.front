import { useEffect, useState } from 'react';
import router from 'next/router';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface UseUserProps {
  redirectTo?: string;
  roles?: string[];
}

const useUser = ({ redirectTo = '/', roles }: UseUserProps) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!secret || !token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.verify(token, secret) as any;

      if (roles) {
        const isUserTypeAuthorized = roles.includes(decoded.user.role);

        if (!isUserTypeAuthorized) {
          router.push(redirectTo);
          return;
        }
      }

      decoded.user as User;
      setUser(decoded.user);
    } catch (e) {
      router.push('/login');
    }
  }, [redirectTo]);

  return { user };
};

export default useUser;
