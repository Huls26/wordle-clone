import { rest } from 'msw';

const handlers = [
  rest.get('https://random-word-api.herokuapp.com/word', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      'Testing',
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/TESTING', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/WATER', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/HIXJOFZ', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
];

export default handlers;
