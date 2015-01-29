define(['react', 'lodash', 'treeView.rt', 'treeNode.rt'], function (React, _, defaultTreeViewTemplate, defaultTreeNodeTemplate) {
    'use strict';

    function getNodesData(comp) {
        var childrenSelector = comp.props.childrenSelector;

        if (typeof childrenSelector === 'string') {
            return comp.props[childrenSelector];
        }

        if (typeof childrenSelector === 'function') {
            return childrenSelector(comp);
        }

        return comp.props.nodes;
    }

    var TreeNode = React.createClass({
        displayName: 'treeNode',
        getInitialState: function () {
            return { collapsed: false };
        },
        toggleCollapsed: function () {
            var isCollapsed = this.state.collapsed;
            this.setState({ collapsed: !isCollapsed });
        },
        render: function () {
            if (typeof this.props.nodeTemplate === 'function') {
                return this.props.nodeTemplate.call(this);
            }

            return defaultTreeNodeTemplate.call(this);
        },
        getTreeViewClass: function () {
            return TreeView;
        }
    });

    var TreeView = React.createClass({
        displayName: 'treeView',
        render: function () {
            var template = this.props.treeTemplate;
            return template.call(this);
        },
        getDefaultProps: function () {
            return {
                nodePath: [],
                childrenSelector: undefined,
                nodeTemplate: defaultTreeNodeTemplate,
                treeTemplate: defaultTreeViewTemplate
            };
        },
        passNodeProps: function (nodeData, nodeIndex) {
            return _.extend({
                nodePath: this.props.nodePath.concat(nodeIndex),
                nodeTemplate: this.props.nodeTemplate,
                childrenSelector: this.props.childrenSelector
            }, nodeData);
        },
        getNodesData: function () {
            return getNodesData(this);
        },
        getTreeNodeClass: function () {
            return TreeNode;
        }
    });

    return TreeView;
});
