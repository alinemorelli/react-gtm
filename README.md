[![Build Status](https://img.shields.io/travis/alinemorelli/react-gtm/master.svg?style=flat-square)](https://travis-ci.org/alinemorelli/react-gtm)
[![npm version](https://img.shields.io/npm/v/react-gtm-module.svg?style=flat-square)](https://www.npmjs.com/package/react-gtm-module)
[![npm downloads](https://img.shields.io/npm/dm/react-gtm-module.svg?style=flat-square)](https://www.npmjs.com/package/react-gtm-module)

# react-gtm-module
### React Google Tag Manager Module

This is a Javascript module to [React](https://facebook.github.io/react/) based apps that implement Google Tag Manager. It is designed to use [GTM](https://developers.google.com/tag-manager/quickstart) snnipets.

You can easily use custom dataLayer, multiple dataLayers and additional events.

## Installation

[npm](https://www.npmjs.com/):

```bash
npm install react-gtm-module --save
```

## Usage

Initializing GTM Module:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000'
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

## DataLayer

### Custom dataLayer example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    dataLayer: {
        userId: '001',
        userProject: 'project'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```


### Multiple dataLayer example:

If you need send multiple custom dataLayer you can initialize GTM Module on different components sending different dataLayers

You can initialize it normally:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    dataLayerName: 'PageDataLayer'
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

```

And send your data in each page you want

```js
import React from 'react'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    dataLayer: {
        userId: '001',
        userProject: 'project',
        page: 'home'
    },
    dataLayerName: 'PageDataLayer'
}
...

const Home = () => {
    ...
    TagManager.dataLayer(tagManagerArgs)
    ...

    return (
        <div className='home'>
            //your component code
        </div>
    )
}

export default Home

```


## Events

### Example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    events: {
        sendUserInfo: 'userInfo'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)
```

## Additional Parameters

### Example:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'

...
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-000000',
    additionalParams: {
      gtm_auth: 'XXXXXX-XXXXXXXXXXXXXXX',
      gtm_preview: 'env-1',
      gtm_cookies_win: 'x'
    }
}

TagManager.initialize(tagManagerArgs)
...

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)
```

|Value|Type|Required|Notes|
|------|-----|-----|-----|
|gtmId| `String`| Yes | GTM id, must be something like `GTM-000000`.|
|dataLayer| `Object`| No | Object that contains all of the information that you want to pass to Google Tag Manager.|
|dataLayerName| `String`| No | Custom name for dataLayer object.|
|events| `Object`| No | Additional events such as 'gtm.start': new Date().getTime(),event:'gtm.js'.|
|additionalParams| `Object`| No | Additional parameters such as 'gtm_auth' used for Environment.|
