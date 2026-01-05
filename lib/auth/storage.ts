import type { User } from './types';


const STORAGE_KEY = 'cmp_user_v1';


function saveUser(user:User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function readUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null
    try{
        return JSON.parse(data) as User; 
    }catch{
        return null;
    }
}

function clearUser(): void {
    localStorage.removeItem(STORAGE_KEY);
}

export { saveUser, readUser, clearUser };

