"use strict";

var _Snippets = require("./Snippets");

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagManager = {
  dataScript: function dataScript(dataLayer) {
    var script = document.createElement("script");
    script.innerHTML = dataLayer;
    return script;
  },
  gtm: function gtm(args) {
    var snippets = _Snippets2.default.tags(args);

    var noScript = function noScript(props) {
      var noscript = document.createElement("noscript");
      if (props) {
        Object.keys(props).forEach(function (pk) {
          noscript.setAttribute(pk, props[pk]);
        });
      }
      noscript.innerHTML = snippets.iframe;
      return noscript;
    };

    var script = function script(props) {
      var script = document.createElement("script");
      if (props) {
        Object.keys(props).forEach(function (pk) {
          script.setAttribute(pk, props[pk]);
        });
      }
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
        dataLayerName = _ref$dataLayerName === undefined ? "dataLayer" : _ref$dataLayerName,
        _ref$auth = _ref.auth,
        auth = _ref$auth === undefined ? "" : _ref$auth,
        _ref$preview = _ref.preview,
        preview = _ref$preview === undefined ? "" : _ref$preview,
        _ref$scriptProps = _ref.scriptProps,
        scriptProps = _ref$scriptProps === undefined ? {} : _ref$scriptProps,
        _ref$noscriptProps = _ref.noscriptProps,
        noscriptProps = _ref$noscriptProps === undefined ? {} : _ref$noscriptProps;

    var gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || undefined,
      dataLayerName: dataLayerName,
      auth: auth,
      preview: preview
    });
    if (dataLayer) document.head.appendChild(gtm.dataScript);
    document.head.insertBefore(gtm.script(scriptProps), document.head.childNodes[0]);
    document.body.insertBefore(gtm.noScript(noscriptProps), document.body.childNodes[0]);
  },
  dataLayer: function dataLayer(_ref2) {
    var _dataLayer = _ref2.dataLayer,
        _ref2$dataLayerName = _ref2.dataLayerName,
        dataLayerName = _ref2$dataLayerName === undefined ? "dataLayer" : _ref2$dataLayerName;

    if (window[dataLayerName]) return window[dataLayerName].push(_dataLayer);
    var snippets = _Snippets2.default.dataLayer(_dataLayer, dataLayerName);
    var dataScript = this.dataScript(snippets);
    document.head.appendChild(dataScript);
  }
};

module.exports = TagManager;