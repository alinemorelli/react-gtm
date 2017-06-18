import React from 'react'
import Snippets from './Snippets'

const GTM = (args) => {
  const snippets = Snippets(args)

  const noScript = () => {
    return <noscript>{snippets.iframe}</noscript>
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
}

const TagManager = (props) => {
  const gtm = GTM({
    id: props.gtmId,
    additionalEvents: props.additionalEvents,
    dataLayer: props.dataLayer || null,
    dataLayerName: props.dataLayerName
  })
  if (props.dataLayer) document.head.appendChild(gtm.dataScript())
  document.head.appendChild(gtm.script())

  return (
    <div className='tagmanager'>
      {gtm.noScript()}
      {props.children}
    </div>
  )
}

TagManager.propTypes = {
  gtmId: React.PropTypes.string.isRequired,
  additionalEvents: React.PropTypes.object,
  dataLayer: React.PropTypes.object,
  dataLayerName: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}

TagManager.defaultProps = {
  dataLayerName: 'dataLayer',
  additionalEvents: {}
}

export default TagManager
