import assert               from 'assert';
import React                from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { mount }            from 'enzyme';
import darkBaseTheme        from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import AppBar               from 'material-ui/AppBar';
import createTestStore      from '../createTestStore';
import App                  from '../../lib/containers/App';

injectTapEventPlugin();
describe('<App />', () => {
  it('render', () => {
    const wrapper = mount(
      <App store={createTestStore()} />, {
        context: {
          store:    createTestStore(),
          muiTheme: getMuiTheme(darkBaseTheme),
        },
        childContextTypes: {
          muiTheme: React.PropTypes.object,
        },
        getChildContext() {
          return { muiTheme: getMuiTheme(darkBaseTheme) };
        },
      },
    );
    assert(wrapper.find(AppBar).length, 1);
  });
});
