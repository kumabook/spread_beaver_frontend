import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import StreamGrid from './StreamGrid';

class StreamTabs extends React.Component {
  static get propTypes() {
    return {
      changeStream: PropTypes.func.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      streams: PropTypes.array.isRequired,
      streamId: PropTypes.string,
    };
  }
  static get defaultProps() {
    return {
      streamId: 'tag/global.latest'
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
            <StreamGrid />
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

function mapStateToProps(state) {
  return {
    streams: state.streams.items,
    streamId: state.entries.streamId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStream: streamId => dispatch(push(`/streams/${streamId}`)),
  };
}

export default translate()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(StreamTabs))
);
