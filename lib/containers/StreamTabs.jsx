import React          from 'react';
import { connect }    from 'react-redux';
import { push }       from 'react-router-redux';
import { Tabs, Tab }  from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class StreamTabs extends React.Component {
  static get propTypes() {
    return {
      handleTabChange: React.PropTypes.func.isRequired,
    };
  }
  componentDidMount() {
  }
  render() {
    const tabs = [
      { label: 'Highlight', id: 'journal/hightlight'},
      { label: 'News', id: 'topic/news'},
      { label: 'Songs', id: 'topic/songs'},
      { label: 'events', id: 'topic/events'},
      { label: 'Overseas', id: 'topic/overseas'},
      { label: 'Videos', id: 'topic/videos'},
    ].map((stream) => (<Tab key={stream.id} label={stream.label} value={stream.id}/>));
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
      slide: {
        padding: 10,
      },
    };
    return (
      <div>
        <Tabs onChange={this.props.handleTabChange}>
          {tabs}
        </Tabs>
        <SwipeableViews>
          <div>
            <h2 style={styles.headline}>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
          </div>
          <div style={styles.slide}>
            slide n°2
          </div>
          <div style={styles.slide}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    streamId: ownProps.params.splat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => {
    },
    handleTabChange: (streamId) => {
      dispatch(push(`/streams/${streamId}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamTabs);
