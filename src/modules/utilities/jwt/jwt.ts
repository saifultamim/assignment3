/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import config from '../../../config';

const jwtSign = (payLoad:any)=>{
    return jwt.sign({
        payLoad
      }, config.access_token_secret as string, { expiresIn: '5 days' })
};


const jwtVerify = (accessToken : string)=>{
    return jwt.verify(
        accessToken as string,
        config.access_token_secret as string
      )
};


export const jwts = {
    jwtSign,
    jwtVerify
}