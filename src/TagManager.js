import React from 'react'
import Snippets from './Snippets'

const TagManager = {
  gtm: function (args) {
    const snippets = Snippets(args)

    const noScript = () => {
      const noscript = document.createElement('noscript')
      noscript.innerHTML = snippets.iframe
      return noscript
    }

    const script = () => {
      const script = document.createElement('script')
      script.innerHTML = snippets.script
      return script
    }

    const dataScript = () => {
      const script = document.createElement('script')
      script.innerHTML = snippets.dataLayerVar
      return script
    }

    return {
      noScript,
      script,
      dataScript
    }
  },
  initialize: function ({ gtmId, additionalEvents = {}, dataLayer, dataLayerName = 'dataLayer' }) {
    const gtm = this.gtm({
      id: gtmId,
      additionalEvents: additionalEvents,
      dataLayer: dataLayer || null,
      dataLayerName: dataLayerName
    })
    if (dataLayer) document.head.appendChild(gtm.dataScript())
    document.head.appendChild(gtm.script())
    document.body.appendChild(gtm.noScript())
  }
}

module.exports = TagManager
