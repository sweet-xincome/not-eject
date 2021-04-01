<!--
 * @Author: jing
 * @Date: 2021-03-31 14:06:58
 * @LastEditTime: 2021-03-31 16:28:11
 * @LastEditors: Please set LastEditors
 * @Description: README.md
 * @FilePath: /Desktop/not-eject/README.md
-->
## 命令

- yarn add typescript @types/node @types/react @types/react-dom @types/jest
- yarn add antd
- yarn add babel-plugin-import --save-dev
- yarn add react-router-dom 
- yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react --dev  
- yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev

```
{
  "scripts":{
    "start": "set PORT=5000 && craco start FAST_REFRESH=true",
    "build": "set GENERATE_SOURCEMAP=false && craco build",
    "analyzer": "env NODE_ENV=production BUILD_ANALYZER=true yarn start",
    "test": "craco test"
  }
}
``` # not-eject
