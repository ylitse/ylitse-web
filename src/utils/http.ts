import { Decoder } from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { Either, isRight } from 'fp-ts/lib/Either';

const parse =
  <A, B>(model: Decoder<A, B>) =>
  (data: A) =>
    model.decode(data);

const getValueOr =
  <A, B>(defaultValue: B) =>
  (decoded: Either<A, B>) =>
    isRight(decoded) ? decoded.right : defaultValue;

export const validateAndTransformTo = <A, B, C>(
  response: A,
  model: Decoder<A, B>,
  defaultValue: B,
  mapper: (a: B) => C,
) => pipe(response, parse(model), getValueOr(defaultValue), mapper);
