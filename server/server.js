import Express from 'express';
import index from './renderer';

const PORT = 3000;

const router = Express.Router();

const path = require('path');

router.use('^/$', index);

router.use(
  Express.static(path.resolve(__dirname, '..', 'build'), {
    maxAge: '30d'
  })
);

router.use('*', index);

const app = new Express();
app.use(router);

app.listen(PORT, () =>
  console.log(`app Server is now running on http://localhost:${PORT}`)
);
