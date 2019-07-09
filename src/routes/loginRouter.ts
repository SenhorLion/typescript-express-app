import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

const loginForm = `
<form method="POST">
  <div>
    <label>Email</label>
    <input name="email" />
  </div>
  <div>
    <label>Password</label>
    <input name="password" type="password "/>
  </div>
  <button>Login</button>
</form>`;

router.get('/login', (req: Request, res: Response) => {
  res.send(loginForm);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hello@you.com' && password === 'password') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send(`You must provide a valid email / password combo to login`);
  }
});

// test redirect route after logged in
router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
    <div><h1>You are logged in</h1></div>
    <a href="/logout">Logout</a></div>
    `);
  } else {
    res.send(`
    <div>
    <div><h1>You are not logged in</h1></div>
    <a href="/login">Login</a></div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

export { router };
