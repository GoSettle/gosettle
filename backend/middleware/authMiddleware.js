import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const ownerOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'OWNER' || req.user.role === 'PG_OWNER' || req.user.role === 'RESTAURANT_OWNER')) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an owner' });
  }
};
