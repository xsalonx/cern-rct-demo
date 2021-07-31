import {fetchClient, Observable, QueryRouter} from '/js/src/index.js';
import FetchedData from "./modelData/FetchedData.js";
import ModelFetchedDataStructure from "./modelData/ModelFetchedDataStructure.js";
const rctDataServerPathname = '/api/Rct-Data/';

export default class ModelLogged extends Observable {
    constructor(parent) {
        super();
        this.parent = parent;

        this.fetchedData = new ModelFetchedDataStructure();

        // TODO;
        this.username = null;

        // Setup router
        this.router = new QueryRouter();
        this.router.observe(this.handleLocationChange.bind(this));
        this.handleLocationChange(); // Init first page
    }

    handleLocationChange() {
        const params = this.router.params;
        const url = this.router.getUrl();
        switch (url.pathname) {
            case '/api/Rct-Data/':
                this.reqForData()
                    .then(r => {console.log('data object constructed and fetched at:', this.router.getUrl())})
                    .catch(e => {console.log(e)});
            break;
            case '/home/':
                break;
            default:
                // default route, replace the current one not handled
                // this.router.go('/home', false);
                break;
        }
    }

    changeItemStatus(item) {
        item.marked = !item.marked;
        this.notify();
    }

    changeRecordsVisibility(data) {
        data.hideMarkedRecords = !data.hideMarkedRecords;
        this.notify();
    }

    // showHideRCTHomepage() {
    //     if (this.contentVisibility.RCTHomepageVisible) {
    //         this.contentVisibility.RCTHomepageVisible = false;
    //         this.currentContent = null;
    //     } else {
    //         if (this.currentContent !== null)
    //             this.contentVisibility[this.currentContent] = false;
    //         this.contentVisibility.RCTHomepageVisible = true;
    //         this.currentContent = "RCTHomepageVisible";
    //     }
    //     this.notify();
    //     if (this.fetchedData.mainRCTTable === null) {
    //         this.reqServerForRCTHomepage().then(r => {
    //             console.log(this.fetchedData);
    //         })
    //     }
    // }
    //
    // async reqServerForRCTHomepage() {
    //     this.fetchedData.mainRCTTable = new FetchedData(this, '/api/RCT-Data/?view=periods&rowsOnSite=50&site=1');
    //     await this.fetchedData.mainRCTTable.fetch();
    // }

    async reqForData() {
        const params = this.router.params;
        const url = this.router.getUrl();
        console.log('reqForData', url);

        console.assert(url.pathname === rctDataServerPathname)
        console.assert(params.hasOwnProperty('page') && params.hasOwnProperty('index'));
        console.assert(params.hasOwnProperty('view'));
        console.assert(params.hasOwnProperty('rowsOnSite'));
        console.assert(params.hasOwnProperty('site'));


        console.assert(this.fetchedData.hasOwnProperty(params.page));
        if (! this.fetchedData[params.page][params.index]) {
            console.log('creating new fetchedData object at: ', url);
            this.fetchedData[params.page][params.index] = new FetchedData(this, url);
        }

        await this.fetchedData[params.page][params.index].fetch();
        return this.fetchedData[params.page][params.index];
    }

    async logout() {
        const response = await fetchClient('/api/logout', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        });
        const content = await response.json();
        const status = response.status;
        this.parent._tokenExpirationHandler(status);

        if (content.type === 'err') {
            alert("Some error occurred: " + content.data);
        } else {
            if (content.type === 'res') {
                alert('successfully logged out');
            }
        }
        sessionStorage.token = null;
        this.parent.mode = "mUnlogged";

        this.notify();
    }

}
