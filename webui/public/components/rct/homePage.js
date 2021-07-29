import { h, switchCase } from '/js/src/index.js';
import RCTTableView from './tableView.js';

export default function RCTHomepage(model) {
    return h('.homePage', [
            h('h1.title', switchCase(model.router.params.page, {
                periods: 'RCT Homepage',
                item: 'Runs per period',
            })),
            h('div.tableDiv', []),
            RCTTableView(model)
        ]);
}