import { rest } from 'msw';

const handlers = [
  rest.get('https://random-word-api.herokuapp.com/word', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      'Testing',
    ]),
  )),
];

export default handlers;
