declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdm: boolean;
        email: string;
      };
    }
  }
}
export {};
