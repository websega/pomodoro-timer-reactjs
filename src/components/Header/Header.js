/* eslint-disable react/prop-types */
import React from 'react';
import SettingIcon from '../../assets/images/icons/settings.svg';

import classes from './Header.scss';

const Header = ({ toggleSettingsPanel }) => {
  return (
    <header className={classes.AppHeader}>
      <h1>PomodoRo</h1>

      <button
        type="button"
        className={classes.SettingsBtn}
        onClick={toggleSettingsPanel}
      >
        <SettingIcon />
      </button>
    </header>
  );
};

export default Header;
