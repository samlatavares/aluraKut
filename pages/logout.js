import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';


export default function logout() {
  const router = useRouter();
  React.useEffect(() => {
    nookies.destroy(null, 'USER_TOKEN');
    router.push('/login');
  }, []);

  return <div></div>
}
