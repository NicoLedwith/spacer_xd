// shims, in case they aren't present in the current environment
require("./util/reactShim");

const React = require("react");
const ReactDOM = require("react-dom");

const App = require("./App");
const PanelController = require("./controllers/PanelController");

const spacingPanel = new PanelController(App);

module.exports = {
    panels: {
        spacing: spacingPanel
    }
};