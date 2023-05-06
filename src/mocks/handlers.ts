import { rest } from 'msw';

const handlers = [
  rest.get('https://random-word-api.vercel.app/api?words=6&length=5', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      'tests',
      'seven',
      'fives',
      'fight',
      'opens',
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/Testing', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
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
    ctx.status(500),
    ctx.json([
      {
        title: 'Testing',
      },
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/JXOSAKN', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/TESTS', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/HIXJN', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      {
        title: 'Testing',
      },
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/HIXJZ', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(
      {
        title: 'Testing',
      },
    ),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/JXOSA', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([
      [{
        title: 'Testing',
      }],
    ]),
  )),
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/SEVEN', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(
      {
        title: 'Testing',
      },
    ),
  )),
];

export default handlers;
