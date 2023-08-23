import { createJWT, hashPass } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await hashPass(req.body.password),
      },
    });

    const jwt = await createJWT(user);
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE, jwt, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.status(201);
    res.end();
  } else {
    res.status(402);
    res.end();
  }
}
