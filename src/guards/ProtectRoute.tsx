// src/guards/withAuth.tsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(Component: React.ComponentType, allowedRoles: string[] = []) {
  return function ProtectedRoute(props: any) {
    const { user, isAuthenticated } = useAuth();
    
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.accessLevel)) {
        router.push("/unauthorized");
      }
    }, [isAuthenticated, user]);

    if (!isAuthenticated || (user && !allowedRoles.includes(user.accessLevel))) {
      return null;
    }

    return <Component {...props} />;
  };
}