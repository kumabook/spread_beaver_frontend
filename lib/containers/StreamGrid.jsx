import React          from 'react';
import { connect }    from 'react-redux';

class StreamGrid extends React.Component {
  static get propTypes() {
    return {
      streamId: React.PropTypes.string.isRequired,
    };
  }
  componentDidMount() {
  }
  render() {
    return <div>{this.props.streamId}</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    streamId: ownProps.params.splat,
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamGrid);
