
export type TUser = {
    name:string,
    email:string,
    password:string,
    phone:string,
    address:string,
    role: 'admin' | 'user'
}

export type TUserlogin = {
    email:string,
    password:string
}
