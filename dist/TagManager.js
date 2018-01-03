'use strict';

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagManager = {
  dataScript: function dataScript(dataLayer) {
    var script = document.createElement('script');
    script.innerHTML = dataLayer;
    return script;
  },
  gtm: function gtm(args) {
    var snippets = _Snippets2.default.tags(args);

    var noScript = function noScript() {
      var noscript = document.createElement('noscript');
      noscript.innerHTML = snippets.iframe;
      return noscript;
    };

    var script = function script() {
      var script = document.createElement('script');
      script.innerHTML = snippets.script;
      return script;
    };

    var dataScript = this.dataScript(snippets.dataLayerVar);

    return {
      noScript: noScript,
      script: script,
      dataScript: dataScript
    };
  },
  initialize: function initialize(_ref) {
    var gtmId = _ref.gtmId,
        _ref$events = _ref.events,
        events = _ref$events === undefined ? {} : _ref$events,
        dataLayer = _ref.dataLayer,
        _ref$dataLayerName = _ref.dataLayerName,
        dataLayerName = _ref$dataLayerName === undefined ? 'dataLayer' : _ref$dataLayerName,
        _ref$additionalParams = _ref.additionalParams,
        additionalParams = _ref$additionalParams === undefined ? {} : _ref$additionalParams;

    var gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || null,
      dataLayerName: dataLayerName,
      additionalParams: additionalParams
    });
    if (dataLayer) document.head.appendChild(gtm.dataScript);
    document.head.appendChild(gtm.script());
    document.body.appendChild(gtm.noScript());
  },
  dataLayer: function dataLayer(_ref2) {
    var _dataLayer = _ref2.dataLayer,
        _ref2$dataLayerName = _ref2.dataLayerName,
        dataLayerName = _ref2$dataLayerName === undefined ? 'dataLayer' : _ref2$dataLayerName;

    var snippets = _Snippets2.default.dataLayer(_dataLayer, dataLayerName);
    var dataScript = this.dataScript(snippets);
    document.head.appendChild(dataScript);
  }
};

module.exports = TagManager;