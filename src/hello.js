define(['react', 'lodash', './hello.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'Hello',
        render: template,

        getSampleNodes: function () {
            return [
                {
                    text: 'Kibbutz Nir David',
                    nodes: [
                        { text: 'Sights', nodes: [ { text: 'Sub-node' } ] },
                        { text: 'Contacts' },
                        { text: 'Map' }
                    ]
                },
                {
                    text: 'Negev',
                    nodes: [
                        { text: 'Plants' },
                        { text: 'Animals' },
                        { text: 'Survival Guide' }
                    ]
                }
            ];
        }
    });
});
