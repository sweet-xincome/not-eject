/*
 * @Author: jing
 * @Date: 2021-03-31 14:06:58
 * @LastEditTime: 2021-04-07 12:59:21
 * @LastEditors: Jing
 * @Description: App main
 * @FilePath: /not-eject/src/App.tsx
 */
import React, { FC } from 'react';
import './App.less';

import Home from 'pages/home/index';

const App: FC = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
