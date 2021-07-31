import { h } from '/js/src/index.js';
import { serialIf } from '../../../../utils/utils.js';

export default function row(model, colNames, data, item, cellsButtons) {
    return h(serialIf(
                    'tr',
                    ['.bg-grey', '.d-none'],
                    ['.bg-warning', ''],
                    [!item.marked, data.hideMarkedRecords && item.marked]
                ), colNames.map(n => {
                        if (item.hasOwnProperty(n)) {
                            if (cellsButtons.hasOwnProperty(n))
                                return h('td', cellsButtons[n](model, item, n));
                            else
                                return h('td', item[n])
                        } else {
                            return h('td', n + '__tmp_');
                        }
                    }).concat([
                    // h('td', item.id),
                    // h('td', item.year),
                    // h('td', button(item.period, () => alert('TODO'))),
                    // h('td', item.beam),
                    // h('td', item.energy),
                    // h('td', 'b field'),
                    // h('td', 'statistics'),

                    h('td', h('input.form-check-input.p1.mh4.justify-center.relative', {
                        style: 'margin-left=0',
                        type: 'checkbox',
                        id: 'record-mark',
                        onclick: (e) => model.changeItemStatus(item)
                    }))

                ]))
}