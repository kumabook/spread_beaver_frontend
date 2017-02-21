import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'react-router-redux';
import { Tabs, Tab }  from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class StreamTabs extends React.Component {
  static get propTypes() {
    return {
      changeStream:   React.PropTypes.func.isRequired,
      fetchStream:    React.PropTypes.func.isRequired,
      streams:        React.PropTypes.array.isRequired,
      streamId:       React.PropTypes.string.isRequired,
      targetStreamId: React.PropTypes.string.isRequired,
      children:       React.PropTypes.element,
    };
  }
  static get defaultProps() {
    return {
      children: <div />,
    };
  }
  componentDidMount() {
    this.fetchStream();
  }
  componentDidUpdate() {
    this.fetchStream();
  }
  fetchStream() {
    if (this.props.streamId !== this.props.targetStreamId) {
      this.props.fetchStream(this.props.targetStreamId);
    }
  }
  currentIndex() {
    const i = this.props.streams.findIndex(s => s.id === this.props.streamId);
    if (i === -1) {
      return 0;
    }
    return i;
  }
  handleChangeIndex(index) {
    const stream = this.props.streams[index];
    this.props.changeStream(stream.id);
  }
  render() {
    const tabs = this.props.streams.map(stream => (
      <Tab key={`tab:${stream.id}`} label={stream.label} value={stream.id} />
    ));
    const views = this.props.streams.map((stream, index) => {
      if (stream.id === this.props.streamId) {
        return (
          <div key={`view:${stream.id}`}>
            {this.props.children}
          </div>
        );
      }
      return (
        <div key={`view:${stream.id}`}>
          <h2>{`${index}: ${stream.id}`}</h2>
        </div>
      );
    });
    return (
      <div>
        <Tabs value={this.props.streamId} onChange={this.props.changeStream}>
          {tabs}
        </Tabs>
        <SwipeableViews
          index={this.currentIndex()}
          onChangeIndex={index => this.handleChangeIndex(index)}
        >
          {views}
        </SwipeableViews>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    streams:        state.streams.items,
    streamId:       state.entries.streamId,
    targetStreamId: ownProps.params.splat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStream: streamId => dispatch(push(`/streams/${streamId}`)),
    fetchStream:  streamId => dispatch({ type: 'fetch_stream', streamId }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamTabs);
