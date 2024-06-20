import { rest } from 'msw';
import { API_URL } from '../../app/constants';

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const author = req.url.searchParams.get('character');
    if (author === 'ramon') {
      return res(ctx.json([]));
    }
    if (author) {
      return res(
        ctx.json([
          {
            quote: "I'm sleeping in the bath tub.",
            character: 'Marge Simpson',
            image: 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205',
            characterDirection: 'Right',
          },
        ])
      );
    } else {
      return res(
        ctx.json([
          {
            quote: "Can't we have one meeting that doesn't end with us digging up a corpse?",
            character: 'Mayor Quimby',
            image: 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMayorQuimby.png?1497627527799',
            characterDirection: 'Left',
          },
        ])
      );
    }
  }),
];
