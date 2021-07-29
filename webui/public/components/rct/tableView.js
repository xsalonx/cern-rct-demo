import { h, switchCase } from '/js/src/index.js';
import button from '../common/button.js';
import tableHeader from './table/header.js';
import row from './table/row.js';
import runTableHeader from './table/runs/run-header.js';
import runRow from './table/runs/run-row.js';
import bTableHeader from './table/b_fields/b-header.js';
import bRow from './table/b_fields/b-row.js';
import flagHeader from './table/flags/flag-header.js';
import flagRow from './table/flags/flag-row.js';

function periods(model) {
    return h('div',
        tableHeader(() => model.changeRecordsVisibility()),
        model.RCTdataFetched ? model.RCTCurentContent.map(item => row(model, item)) : 'loading data'
    );
}

function runs(model) {
    return h('div',
        runTableHeader(() => model.changeRecordsVisibility()),
        model.RCTdataFetched ? model.RCTCurentContent.map(item => runRow(model, item)) : 'loading data'
    );
}

function bFields(model) {
    return h('div',
        bTableHeader(() => model.changeRecordsVisibility()),
        model.RCTdataFetched ? model.RCTCurentContent.map(item => bRow(model, item)) : 'loading data'
    );
}

function flags(model) {
    return h('div',
        flagHeader(() => model.changeRecordsVisibility()),
        model.RCTdataFetched ? model.RCTCurentContent.map(item => flagRow(model, item)) : 'loading data'
    );
}

export default function RCTTableView(model) {
    return h('div.p3', h('table.table', {id: 'data-table'}, [

        h('thead.text-center', "Periods"),
        button('reload data', () => model.reqServerForRCTHomePage(), 'reload-btn'),

        h('tbody', {id: 'periods-table-body'}, [
            switchCase(model.router.params.page, {
                periods: periods(model),
                runs: runs(model),
                bfields: bFields(model),
                flags: flags(model),
            })
        ])
    ]))
}
