/*
 * @Author: your name
 * @Date: 2021-03-31 14:06:58
 * @LastEditTime: 2021-03-31 16:36:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /not-eject/src/reportWebVitals.ts
 */
import { ReportHandler } from 'web-vitals';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
