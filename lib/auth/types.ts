
type Role = 'admin' | 'user';

type User = {
    id: string;
    name: string;
    email: string;
    roles: Role[];
};

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

type LoginInput = {
    email: string;
    password: string;
};

type AuthState = {
    user: User | null;
    status: AuthStatus;
};

type AuthContextValue= AuthState & {
    login: (input: LoginInput) => Promise<void>;
    ogout: () => void; 
    hasRole: (role: Role) => boolean;
};

export type { Role, User, AuthStatus, LoginInput, AuthState, AuthContextValue };