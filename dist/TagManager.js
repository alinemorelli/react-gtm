'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Snippets = require('./Snippets');

var _Snippets2 = _interopRequireDefault(_Snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GTM = function GTM(args) {
  var snippets = (0, _Snippets2.default)(args);

  var noScript = function noScript() {
    return _react2.default.createElement(
      'noscript',
      null,
      snippets.iframe
    );
  };

  var script = function script() {
    var script = document.createElement("script");
    script.innerHTML = snippets.script;
    return script;
  };

  var dataScript = function dataScript() {
    var script = document.createElement("script");
    script.innerHTML = snippets.dataLayerVar;
    return script;
  };

  return {
    noScript: noScript,
    script: script,
    dataScript: dataScript
  };
};

var TagManager = function TagManager(props) {
  var gtm = GTM({
    id: props.gtmId,
    dataLayer: props.dataLayer,
    additionalEvents: props.additionalEvents
  });
  if (props.dataLayer) document.head.appendChild(gtm.dataScript());
  document.head.appendChild(gtm.script());

  return _react2.default.createElement(
    'div',
    { className: 'tagmanager' },
    gtm.noScript(),
    props.children
  );
};

TagManager.propTypes = {
  dataLayer: _react.PropTypes.object,
  gtmId: _react.PropTypes.string.isRequired,
  additionalEvents: _react.PropTypes.object,
  children: _react.PropTypes.children
};

TagManager.defaultProps = {
  dataLayer: 'dataLayer',
  additionalEvents: {}
};

exports.default = TagManager;