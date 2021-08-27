import { h } from '/js/src/index.js';

export default function modal(title, content) {
    return h('div.modal', {id: 'myModal'},
        h('div.modal-content',
            h('p', title),
            h('span.close',  'close'),
            h('p', content),
        )
    );
}
