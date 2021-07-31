import { h } from '/js/src/index.js';

export default function tableHeader(colNames, data, checkBoxFunction) {
    return h('tr',
                colNames.map(name => {
                    return h('th', {scope: 'col'}, name)
                }).concat([
                // h('th', {scope: "col"}, "id"),
                // h('th', {scope: "col"}, "Data taking year"),
                // h('th', {scope: "col"}, "Data taking period"),
                // h('th', {scope: "col"}, "Beam"),
                // h('th', {scope: "col"}, "Energy"),
                // h('th', {scope: "col"}, "B field"),
                // h('th', {scope: "col"}, "Statistics"),

                h('th', {scope: "col"},
                    h('.form-check.mv2', [
                        h('input.form-check-input', {
                            type: 'checkbox',
                            id: 'hide-marked',
                            onclick: checkBoxFunction
                        }, ''),
                        h('label.form-check-label', {for: 'hide-marked'}, 'Hide marked')
                    ])
                )
            ]))
}