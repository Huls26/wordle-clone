import { rest } from 'msw';

const handlers = [
  rest.get('https://random-word-api.herokuapp.com/word', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      'Testing',
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/:word', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{ title: 'hello' }],
    ]),
  )),
];

export default handlers;
