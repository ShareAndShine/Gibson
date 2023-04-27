import { LightningElement, api, track, wire } from 'lwc';
import getSalesOrderData from '@salesforce/apex/ExportDataController.getSalesOrderBDM';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class BizManagerSetMonthlyOrder extends LightningElement {
    _contactId = '';
    wiredMyApexMethodResult;

    @api editMode = false;

    @api
    get contactId() {
        return this._contactId;
    }
    set contactId(value) {
        this._contactId = value;
        if (this.wiredMyApexMethodResult) {
            refreshApex(this.wiredMyApexMethodResult);
        }
    }

    @track salesTargetData = [];

    get columns() {
        let columnList = [
            { label: "Business Unit / Month", fieldName: "busUnit", type: "text", typeAttributes: {} },
            { label: "Apr", fieldName: "Apr", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "May", fieldName: "May", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Jun", fieldName: "Jun", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Jul", fieldName: "Jul", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Aug", fieldName: "Aug", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Sep", fieldName: "Sep", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Oct", fieldName: "Oct", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Nov", fieldName: "Nov", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Dec", fieldName: "Dec", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Jan", fieldName: "Jan", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Feb", fieldName: "Feb", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Mar", fieldName: "Mar", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        ];

        if (!this.editMode) {
            columnList.push({ label: "Total", fieldName: "total", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} });
        }
        return columnList;
    }

    get editLastRow() {
        return !this.editMode;
    }

    @wire(getSalesOrderData, { contactId: '$contactId' })
    wiredMyApexMethod(result) {
        this.wiredMyApexMethodResult = result;
        if (result.data) {
            // Handle successful data retrieval
            this.salesTargetData = [];

            let targetData = { id: 1, busUnit: "Total", Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0, Jan: 0, Feb: 0, Mar: 0, total: 0, isFirst: false };

            let count = 2;
            for (let busUnit in result.data) {
                let salesTar = { ...result.data[busUnit], id: count, busUnit: busUnit, total: 0, isFirst: true };
                for (let month in result.data[busUnit]) {
                    // if (this.listType == 'Order') {
                    //     result.data[busUnit][month] += (result.data[busUnit][month] * 0.23);
                    // }

                    salesTar.total += result.data[busUnit][month];
                    targetData[month] += result.data[busUnit][month];

                    //console.log(this.nFormatter(result.data[busUnit][month], 0));
                }
                targetData.total += salesTar.total;

                //salesTar.total = this.nFormatter(salesTar.total, 0);

                this.salesTargetData.push(salesTar);
                count++;
            }

            this.salesTargetData.push(targetData);

            for (let data of this.salesTargetData) {
                for (let key in data) {
                    if (key != 'id' && key != 'busUnit' && key != 'isFirst') {
                        data[key + 'Data'] = this.nFormatter(data[key], 0);
                    }
                }
            }

            //console.log(JSON.stringify(this.salesTargetData));
            this.error = undefined;
        } else if (result.error) {
            // Handle error
            console.log('error===>', result.error);
            this.error = result.error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Records',
                    message: result.error.message,
                    variant: 'error'
                }),
            );
        }
    }

    handleClick(event) {
        this.editMode = !this.editMode;
    }

    nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }

}