import { Router, Request } from 'express';

import { create as createSessionValidator } from '@validators/sessions';

import AuthenticateUserService from '@services/AuthenticateUserService';

const routes = Router();

interface IRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

routes.post('/', createSessionValidator, async (req: IRequest, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({ email, password });

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  });
});

export default routes;
