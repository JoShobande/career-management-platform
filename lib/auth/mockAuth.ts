import type { LoginInput, User } from "./types";


function sleep(ms:number):Promise<void>{
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockLogin(input:LoginInput): Promise<User>{
    await sleep(500);
    if (input.email.toLowerCase().includes("admin")){
        return{
            id: crypto.randomUUID(),
            email: input.email,
            name: "Admin User",
            roles: ["admin"]
        };
    } else {
        return{
            id:  crypto.randomUUID(),
            email: input.email,
            name: "Regular User",
            roles: ["user"]
        };
    }
}