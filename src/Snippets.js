import warn from './utils/warn'

// https://developers.google.com/tag-manager/quickstart

const Snippets = {
  tags: function ({ id, events, dataLayer, dataLayerName, additionalParams }) {
    if (!id) warn('GTM Id is required')

    const appendParams = (params) => {
      const keys = Object.keys(params);

      if (!keys.length) return '';
      
      return '&' + 
        Object.keys(params).map(function(key) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }).join('&');
    }
    
    const iframe = `
      <iframe src="//www.googletagmanager.com/ns.html?id=${id}${appendParams(additionalParams)}"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`
  
    const script = `
      (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${JSON.stringify(events).slice(1, -1)}});
        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl+'${appendParams(additionalParams)}';
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','${dataLayerName}','${id}');`
  
    const dataLayerVar = this.dataLayer(dataLayer, dataLayerName)
  
    return {
      iframe,
      script,
      dataLayerVar
    }
  },
  dataLayer: function (dataLayer, dataLayerName) {
    return `
      window.${dataLayerName} = window.${dataLayerName} || [];
      window.${dataLayerName}.push(${JSON.stringify(dataLayer)})`
  }
}  

module.exports = Snippets