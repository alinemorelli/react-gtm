import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = ({ id, additionalEvents, dataLayer, dataLayerName }) => {
  if (!id) warn('GTM Id is required')

  const iframe = `
    <iframe src="//www.googletagmanager.com/ns.html?id=${id}"
      height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`

  const script = `
    (function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(additionalEvents).slice(1, -1)}});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','${dataLayerName}','${id}');`

  const dataLayerVar = `
    window.${dataLayerName} = window.${dataLayerName} || [];
    window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`

  return {
    iframe,
    script,
    dataLayerVar
  }
}

export default Snippets