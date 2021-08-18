import { h } from '/js/src/index.js';

export default function bTableHeader(checkBoxFunction) {
    return h('tr', [
                h('th', {scope: "col"}, "id"),
                h('th', {scope: "col"}, "b field"),
                h('th', {scope: "col"}, "run id"),
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
            ])
}
