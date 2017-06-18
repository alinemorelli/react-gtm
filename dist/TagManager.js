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
};

var TagManager = function TagManager(props) {
  var gtm = GTM({
    id: props.gtmId,
    additionalEvents: props.additionalEvents,
    dataLayer: props.dataLayer || null,
    dataLayerName: props.dataLayerName
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
  gtmId: _react2.default.PropTypes.string.isRequired,
  additionalEvents: _react2.default.PropTypes.object,
  dataLayer: _react2.default.PropTypes.object,
  dataLayerName: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.node), _react2.default.PropTypes.node])
};

TagManager.defaultProps = {
  dataLayerName: 'dataLayer',
  additionalEvents: {}
};

exports.default = TagManager;