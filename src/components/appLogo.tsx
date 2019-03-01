import * as React from 'react';
import { CONFIG } from '../config';

const leapLogo = require('../motion-protocol.png');

const AppLogo = () => {
  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        color: 'rgba(0,0,0,.65)',
        marginRight: 10,
        position: 'relative',
      }}
    >
      <img
        src={leapLogo}
        width="50"
        height="50"
        className="logo"
        style={{
          flexShrink: 0,
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -25,
          marginTop: -25,
        }}
        alt=""
      />

    </div>
  );
};

export default AppLogo;
