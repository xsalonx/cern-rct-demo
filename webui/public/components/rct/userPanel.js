import { h } from '/js/src/index.js';
import { goodBadOpt } from '../../utils/utils.js';
import RCTHomepage from './homePage.js';
import header from '../common/header.js';
import button from '../common/button.js';

function handleClick(model, e) {
    model.router.handleLinkEvent(e);
    model.notify();
}

const menu = (model) => h('.mySidebar.flex-column.bg-gray-lighter', [
    h(goodBadOpt('button.btn.p2.m2', ['.btn-success'], ['.btn-primary'], [!model.RCTHomepageVisible]),
    {id: 'RCT-main-show-btn', onclick: e => model.showHideRCTHomepage()}, 'Show/hide RCT Homepage'), ' ',

    button('RCT Home page', (e) => {handleClick(model, e); model.reqServerForRCTHomepage();}, '', '?page=periods'),
    button('Runs', (e) => {handleClick(model, e); model.reqServerForRuns();}, '', '?page=runs'),
    button('B fields', (e) => {handleClick(model, e); model.reqServerForBFields();}, '', '?page=bfields'),
    button('MC', (e) => {handleClick(model, e); model.reqServerForMc();}, '', '?page=mc'),
    button('Flags', (e) => {handleClick(model, e); model.reqServerForFlags();}, '', '?page=flags'),
    
    button('Period view', () => {return undefined;}),
    button('Period view', () => {return undefined;}),
    button('Runs per period view', () => {return undefined;}),
    button('Alternative layout', () => {return undefined;}),
    button('Data or MC', () => {return undefined;}),
    button('Pass QA Statistics Summary', () => {return undefined;}),
    button('QA Expert Flagging', () => {return undefined;}),
]);

export default function userPanel(model) {
    return h('.flex-column.absolute-fill', [
        header(model),
        // content below menu bar
        h('.flex-grow.flex-row', [
            // sidebar
            menu(model),
            
            // content
            h('.flex-grow.relative', [
                h('.scroll-y.absolute-fill.bg-white', {id: 'main-content'}, [
                    model.contentVisibility.RCTHomepageVisible ? RCTHomepage(model) : h('h4.primary', 'click on "Show/hide ..." button'),
                ])
            ])
        ])
    ])
}
