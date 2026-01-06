
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
    userStatus: AuthStatus;
};

type AuthContextValue= AuthState & {
    login: (input: LoginInput) => Promise<void>;
    logout: () => void; 
    hasRole: (role: Role) => boolean;
};

export type { Role, User, AuthStatus, LoginInput, AuthState, AuthContextValue };