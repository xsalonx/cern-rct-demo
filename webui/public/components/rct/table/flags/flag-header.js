import { h } from '/js/src/index.js';

export default function flagHeader(checkBoxFunction) {
    return h('tr', [
                h('th', {scope: "col"}, "id"),
                h('th', {scope: "col"}, "run id"),
                h('th', {scope: "col"}, "start"),
                h('th', {scope: "col"}, "end"),
                h('th', {scope: "col"}, "flag"),
                h('th', {scope: "col"}, "comment"),
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
