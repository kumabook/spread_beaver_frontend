import React             from 'react';
import { connect }       from 'react-redux';


class App extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.element,
    };
  }
  static get defaultProps() {
    return {
      children: [],
    };
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
