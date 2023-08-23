import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

export const hashPass = (pass) => bcrypt.hash(pass, 15);

export const checkPass = (textPass, hasedPass) =>
  bcrypt.compare(textPass, hasedPass);

export const createJWT = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ userData: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (token) => {
  const { userData } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return userData.payload as any;
};

export const getUserCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE);
  const { id } = await validateJWT(jwt.value);
  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
