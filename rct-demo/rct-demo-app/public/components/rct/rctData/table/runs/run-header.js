import { h } from '/js/src/index.js';

export default function runTableHeader(checkBoxFunction) {
    return h('tr', [
                h('th', {scope: "col"}, "id"),
                h('th', {scope: "col"}, "period id"),
                h('th', {scope: "col"}, "run number"),
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
