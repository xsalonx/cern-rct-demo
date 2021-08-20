import {h, switchCase} from '/js/src/index.js';
import viewButton from '../../common/viewButton.js';
import tableHeader from './table/header.js';
import row from './table/row.js';
import pagesCellsButtons from "./pagesCellsButtons.js";
import siteController from "./siteController.js";


export default function tableView(model) {

    const params = model.router.params;
    const data = model.fetchedData[params.section][params.index];

    const cellsButtons = pagesCellsButtons[params.section];

    const fields = data.fields;
    const visibleFields = fields.filter(f => f.marked);

    return h('div.p3', [
        fieldsVisibilityControl(model, data, fields),
        siteController(model, data),
        viewButton(model, 'reload data', () => data.fetch(), 'reload-btn'), ' ', // TODO move up
        h('table.table', {id: 'data-table-' + data.url}, [

            // h('caption', data.name),
            tableHeader(visibleFields, data, () => data.changeRecordsVisibility(data)),
            tableBody(model, visibleFields, data, cellsButtons)

        ])
    ])

}



function fieldsVisibilityControl(mode, data, fields) {
    return h('.flex-row.p3.justify-start', fields.map(f =>
        h('span.p1.thin-border', [
            h('.d-block.w-100', h('input.p3', {
                onclick: () => data.changeItemStatus(f),
                checked: f.marked,
                type: 'checkbox'
            })),
            h('p', f.name)
        ])
    ))
}


function tableBody(model, visibleFields, data, cellsButtons) {
    return h('tbody', {id: 'table-body-' + data.url},
        data.rows.map(item => row(model, visibleFields, data, item, cellsButtons))
    );
}