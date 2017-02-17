import React           from 'react';
import assert          from 'assert';
import { shallow }     from 'enzyme';
import { Tabs }        from 'material-ui/Tabs';
import createTestStore from '../createTestStore';
import StreamTabs      from '../../lib/containers/StreamTabs';

describe('<StreamTabs />', () => {
  it('render', () => {
    const params   =  { splat: 'journal/highlight' };
    const store    = createTestStore();
    const wrapper  = shallow(<StreamTabs store={store} params={params} />);
    assert(wrapper.dive().find(Tabs).length, 1);
  });
});
