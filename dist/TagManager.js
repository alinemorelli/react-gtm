'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagManager = {
  gtm: function gtm(args) {
    var snippets = (0, _Snippets2.default)(args);

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

    var dataScript = function dataScript() {
      var script = document.createElement('script');
      script.innerHTML = snippets.dataLayerVar;
      return script;
    };

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
        dataLayerName = _ref$dataLayerName === undefined ? 'dataLayer' : _ref$dataLayerName;

    var gtm = this.gtm({
      id: gtmId,
      events: events,
      dataLayer: dataLayer || null,
      dataLayerName: dataLayerName
    });
    if (dataLayer) document.head.appendChild(gtm.dataScript());
    document.head.appendChild(gtm.script());
    document.body.appendChild(gtm.noScript());
  }
};

module.exports = TagManager;