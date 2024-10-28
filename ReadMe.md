# Taro Fetch polyfill

[Taro][1] 3+ 非官方 W3C [`fetch()` API][2] 补丁

[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/Taro-Fetch-polyfill.svg)][3]
[![CI & CD](https://github.com/idea2app/Taro-Fetch-polyfill/actions/workflows/main.yml/badge.svg)][4]

[![NPM](https://nodei.co/npm/taro-fetch-polyfill.png?downloads=true&downloadRank=true&stars=true)][5]

## 用法

> ❗因小程序锁定了全局对象，无法采用标准的 polyfill 方式，只能用 ponyfill 来导入。

```javascript
import { fetch } from 'taro-fetch-polyfill';

fetch('https://api.github.com')
    .then(response => response.json())
    .then(console.log);
```

[1]: https://taro.jd.com/
[2]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
[3]: https://libraries.io/npm/taro-fetch-polyfill
[4]: https://github.com/idea2app/Taro-Fetch-polyfill/actions/workflows/main.yml
[5]: https://nodei.co/npm/taro-fetch-polyfill/
