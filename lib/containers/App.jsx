import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import AppBar from 'material-ui/AppBar';
import { getStyles } from 'material-ui/AppBar/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import appStyles from '../styles/App.css';

class App extends React.Component {
  static get propTypes() {
    return {
      t: PropTypes.func.isRequired,
      changeLocale: PropTypes.func.isRequired,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
      ]).isRequired,
    };
  }
  static get contextTypes() {
    return { muiTheme: PropTypes.object.isRequired };
  }
  static renderHelmet() {
    return (
      <Helmet>
        <title>TYPICA</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/static/vendor.css" />
      </Helmet>
    );
  }
  handleLocaleMenuClick(locale) {
    this.props.changeLocale(locale);
  }
  render() {
    const { t } = this.props;
    const styles = getStyles(this.props, this.context);
    styles.flatButton.top = -styles.flatButton.marginTop;
    styles.flatButton.marginTop = 0;
    const rightIcons = (
      <div className={appStyles.container}>
        <FlatButton label={t('App.my_channels')} style={styles.flatButton} />
        <FlatButton label={t('App.favorite')} style={styles.flatButton} />
        <FlatButton label={t('App.login')} style={styles.flatButton} />
        <IconMenu
          iconStyle={styles.iconButtonIconStyle}
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="JA"
            onClick={() => this.handleLocaleMenuClick('ja')}
          />
          <MenuItem
            primaryText="EN"
            onClick={() => this.handleLocaleMenuClick('en')}
          />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </div>
    );
    return (
      <div>
        <AppBar title="App title" iconElementRight={rightIcons} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale =>
      dispatch({ type: 'change_locale', payload: locale }),
  };
}

export default translate()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
);
