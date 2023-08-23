import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { checkPass, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid Login' });
    }

    const isUser = await checkPass(req.body.password, user?.password);

    if (!isUser) {
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
      res.status(401);
      res.json({ error: 'Invalid login' });
    }
  } else {
    res.status(402);
    res.end();
  }
}
