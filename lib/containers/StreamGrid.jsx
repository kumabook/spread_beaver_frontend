import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

// eslint-disable-next-line react/prefer-stateless-function
class StreamGrid extends React.Component {
  static get propTypes() {
    return {
      entries: PropTypes.arrayOf(PropTypes.object).isRequired,
    };
  }
  render() {
    return (
      <GridList cellHeight={180} style={{}}>
        {this.props.entries.map(entry => (
          <GridTile
            key={entry.id}
            title={entry.title}
            subtitle={
              <span>
                by <b>{entry.author}</b>
              </span>
            }
            actionIcon={
              <IconButton>
                <StarBorder color="white" />
              </IconButton>
            }
          >
            <img src={entry.visual.url} alt={entry.title} />
          </GridTile>
        ))}
      </GridList>
    );
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries.items,
  };
}

function mapDispatchToProps() {
  return {};
}

export default translate()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(StreamGrid))
);
