# Taro Fetch polyfill

[Taro][1] 3+ 非官方 W3C [`fetch()` API][2] 补丁

[![CI & CD](https://github.com/idea2app/Taro-Fetch-polyfill/actions/workflows/main.yml/badge.svg)][3]

[![NPM](https://nodei.co/npm/taro-fetch-polyfill.png?downloads=true&downloadRank=true&stars=true)][4]

## 用法

```javascript
import 'taro-fetch-polyfill';

fetch('https://api.github.com')
    .then(response => response.json())
    .then(console.log);
```

[1]: https://taro.jd.com/
[2]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
[3]: https://github.com/idea2app/Taro-Fetch-polyfill/actions/workflows/main.yml
[4]: https://nodei.co/npm/taro-fetch-polyfill/
