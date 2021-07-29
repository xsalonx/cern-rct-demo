import { h } from '/js/src/index.js';
import { goodBadOpt } from '../../../../utils/utils.js';

export default function mcRow(model, item) {
    return h(goodBadOpt(
                    'tr',
                    ['.bg-grey', '.d-none'],
                    ['.bg-warning', ''],
                    [!item.marked, model.hideMarkedRecords && item.marked]
                ), [
                    h('td', item.id),
                    h('td', item.period_id),
                    h('td', item.run_number),
                    h('td', item.filling_scheme),
                    h('td', item.mu),
                    h('td', item.ir),

                    h('td', h('input.form-check-input.p1.mh4.justify-center.relative', {
                        style: 'margin-left=0',
                        type: 'checkbox',
                        id: 'record-mark',
                        onclick: (e) => model.changeItemStatus(item)
                    }))

                ])
}
