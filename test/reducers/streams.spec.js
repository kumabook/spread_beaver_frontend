import assert  from 'assert';
import reducer from '../../lib/reducers/streams';

describe('streams reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reducer(undefined, {}).items.length, 6);
  });
});
