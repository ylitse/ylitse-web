import { Decoder } from 'io-ts/Decoder';
import { pipe } from 'fp-ts/function';
import { Either, isRight, isLeft } from 'fp-ts/lib/Either';

const parse =
  <A, B>(model: Decoder<A, B>, notification?: () => void) =>
  (data: A) => {
    const parsed = model.decode(data);
    if (isLeft(parsed)) {
      notification?.();
    }

    return parsed;
  };

const getValueOr =
  <A, B>(defaultValue: B) =>
  (decoded: Either<A, B>) =>
    isRight(decoded) ? decoded.right : defaultValue;

export const validateAndTransformTo = <A, B, C>(
  response: A,
  model: Decoder<A, B>,
  defaultValue: B,
  mapper: (a: B) => C,
  notification?: () => void,
) =>
  pipe(response, parse(model, notification), getValueOr(defaultValue), mapper);
