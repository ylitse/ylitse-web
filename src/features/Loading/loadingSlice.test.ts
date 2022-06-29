import loadingReducer, { LoadingState, ready, loading } from './loadingSlice';

describe('Loading reducer', () => {
  const initialState: LoadingState = {
    message: '',
    status: 'ready',
  };
  it('should handle initial state', () => {
    expect(loadingReducer(undefined, { type: 'unknown' })).toEqual({
      message: '',
      status: 'ready',
    });
  });

  it('should handle ready', () => {
    const actual = loadingReducer(initialState, ready());
    expect(actual.status).toEqual('ready');
  });

  it('should handle loading', () => {
    const actual = loadingReducer(initialState, loading('Ladataan appista'));
    expect(actual.status).toEqual('loading');
    expect(actual.message).toEqual('Ladataan appista');
  });
});
