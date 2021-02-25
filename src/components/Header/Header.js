import React, { useCallback, useState } from 'react';

import SettingIcon from '../../assets/images/icons/settings.svg';
import SettingsPanel from '../SettingsPanel';

import classes from './Header.scss';

const Header = React.memo(() => {
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const toggleVisibilityPanel = useCallback(() => {
    setIsOpenSettings(!isOpenSettings);
  }, [isOpenSettings]);

  return (
    <>
      <header className={classes.AppHeader}>
        <h1>PomodoRo</h1>

        <button
          type="button"
          className={classes.SettingsBtn}
          onClick={toggleVisibilityPanel}
          aria-label="Settings"
        >
          <SettingIcon />
        </button>
      </header>

      <SettingsPanel isOpen={isOpenSettings} />
    </>
  );
});

export default Header;
