import { h } from '/js/src/index.js';
import { goodBadOpt } from '../../../../utils/utils.js';

export default function flagRow(model, item) {
    return h(goodBadOpt(
                    'tr',
                    ['.bg-grey', '.d-none'],
                    ['.bg-warning', ''],
                    [!item.marked, model.hideMarkedRecords && item.marked]
                ), [
                    h('td', item.id),
                    h('td', item.run_id),
                    h('td', item.start),
                    h('td', item.end),
                    h('td', item.flag),
                    h('td', item.comment),

                    h('td', h('input.form-check-input.p1.mh4.justify-center.relative', {
                        style: 'margin-left=0',
                        type: 'checkbox',
                        id: 'record-mark',
                        onclick: (e) => model.changeItemStatus(item)
                    }))

                ])
}
