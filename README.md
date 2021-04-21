[![npm](https://img.shields.io/npm/v/length-prefix-framed-stream.svg)](https://www.npmjs.com/package/length-prefix-framed-stream)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/length-prefix-framed-stream)](https://bundlephobia.com/result?p=length-prefix-framed-stream)
[![downloads](http://img.shields.io/npm/dm/length-prefix-framed-stream.svg?style=flat-square)](https://npmjs.org/package/length-prefix-framed-stream)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/length-prefix-framed-stream.svg?style=flat-square)](https://github.com/arlac77/length-prefix-framed-stream/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Flength-prefix-framed-stream%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/length-prefix-framed-stream/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/length-prefix-framed-stream/badge.svg)](https://snyk.io/test/github/arlac77/length-prefix-framed-stream)
[![Coverage Status](https://coveralls.io/repos/arlac77/length-prefix-framed-stream/badge.svg)](https://coveralls.io/github/arlac77/length-prefix-framed-stream)

# length-prefix-framed-stream

Stream framing with length prefixes

```js
import { pipeline } from "stream";
import { Encode } from "length-prefix-framed-stream";

const encode = new Encode();

pipeline(encode, aSendStream, e => {});

encode.write("message 1");
encode.write("message 2");
```

```js
import { pipeline } from "stream";
import { Decode } from "length-prefix-framed-stream";

const decode = new Decode({ objectMode: true, encoding: "utf8" });

pipeline(aReceiveStream, decode, e => {});

for await (const message of decode) {
    console.log(message); // whole messages as put in above
}
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## Table of Contents

# install

With [npm](http://npmjs.org) do:

```shell
npm install length-prefix-framed-stream
```

# license

BSD-2-Clause
