import React from 'react'
import Snippets from './Snippets'

const GTM = (args) => {
  const snippets = Snippets(args)

  const noScript = () => {
    return <noscript>{snippets.iframe}</noscript>
  }

  const script = () => {
    const script = document.createElement("script")
    script.innerHTML = snippets.script
    return script
  }

  const dataScript = () => {
    const script = document.createElement("script")
    script.innerHTML = snippets.dataLayerVar
    return script
  }

  return {
    noScript,
    script,
    dataScript
  }
}

const TagManager = (props) => {
  const gtm = GTM({
    id: props.gtmId,
    dataLayer: props.dataLayer,
    additionalEvents: props.additionalEvents
  })
  if (props.dataLayer) document.head.appendChild(gtm.dataScript())
  document.head.appendChild(gtm.script())

  return (
    <div className="tagmanager">
      {gtm.noScript()}
      {props.children}
    </div>
  )
}

TagManager.propTypes = {
  dataLayer: React.PropTypes.object,
  gtmId: React.PropTypes.string.isRequired,
  additionalEvents: React.PropTypes.object,
  children: React.PropTypes.children
}

TagManager.defaultProps = {
  dataLayer: 'dataLayer',
  additionalEvents: {}
}

export default TagManager