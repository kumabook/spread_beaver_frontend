import React             from 'react';
import { connect }       from 'react-redux';
import AppBar            from 'material-ui/AppBar';
import { getStyles }     from 'material-ui/AppBar/AppBar';
import MenuItem          from 'material-ui/MenuItem';
import FlatButton        from 'material-ui/FlatButton';
import IconMenu          from 'material-ui/IconMenu';
import IconButton        from 'material-ui/IconButton';
import MoreVertIcon      from 'material-ui/svg-icons/navigation/more-vert';

class App extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.node),
        React.PropTypes.node,
      ]),
      handleClick: React.PropTypes.func.isRequired,
    };
  }
  static get defaultProps() {
    return {
      children: [],
    };
  }
  static get contextTypes() {
    return { muiTheme: React.PropTypes.object.isRequired };
  }
  render() {
    const styles                = getStyles(this.props, this.context);
    styles.flatButton.top       = -styles.flatButton.marginTop;
    styles.flatButton.marginTop = 0;
    const rightIcons = (
      <div>
        <FlatButton label="My Channels" style={styles.flatButton} />
        <FlatButton label="Favorite" style={styles.flatButton} />
        <FlatButton label="Login" style={styles.flatButton} />
        <IconMenu
          iconStyle={styles.iconButtonIconStyle}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Refresh" />
          <MenuItem primaryText="Help" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    );
    return (
      <div>
        <AppBar
          title="App title"
          iconElementRight={rightIcons}
          onLeftIconButtonTouchTap={this.props.handleClick}
        />
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
    handleClick: () => {
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
