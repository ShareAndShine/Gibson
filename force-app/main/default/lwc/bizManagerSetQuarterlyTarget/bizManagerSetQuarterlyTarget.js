import { LightningElement, wire, api, track } from 'lwc';
import getSalesTargetData from '@salesforce/apex/ExportDataController.getSalesTargetQuatBDM';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class BizManagerSetQuarterlyTarget extends LightningElement {
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

    @track salesTargetData = {};

    get columns() {
        let columnList = [
            { label: "Business Unit / Month", fieldName: "busUnit", type: "text", typeAttributes: {} },
            { label: "Quarter 1 (Apr - Jun)", fieldName: "Q1", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Quarter 2 (July - Sep)", fieldName: "Q2", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Quarter 3 (Oct - Dec)", fieldName: "Q3", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Quarter 4 (Jan - Mar)", fieldName: "Q4", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        ];

        if (!this.editMode) {
            columnList.push({ label: "Total", fieldName: "total", type: "currency", editable: this.editMode, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} });
        }
        return columnList;
    }

    get editLastRow() {
        return !this.editMode;
    }

    @wire(getSalesTargetData, { contactId: '$contactId' })
    wiredMyApexMethod(result) {
        this.wiredMyApexMethodResult = result;
        if (result.data) {
            // Handle successful data retrieval
            this.salesTargetData = [];

            let targetData = { id: 1, busUnit: "Total", Q1: 0, Q2: 0, Q3: 0, Q4: 0, total: 0, isFirst: false };

            let count = 2;
            for (let busUnit in result.data) {
                let salesTar = { ...result.data[busUnit], id: count, busUnit: busUnit, total: 0, isFirst: true };

                for (let quarter in result.data[busUnit]) {
                    salesTar.total += result.data[busUnit][quarter];
                    targetData[quarter] += result.data[busUnit][quarter];
                }
                targetData.total += salesTar.total;

                this.salesTargetData.push(salesTar);
                count++;
            }

            this.salesTargetData.push(targetData);
            console.log('Quarter Data', JSON.stringify(this.salesTargetData))

            for (let data of this.salesTargetData) {
                for (let key in data) {
                    if (key != 'id' && key != 'busUnit' && key != 'isFirst') {
                        data[key + 'Data'] = this.nFormatter(data[key], 0);
                    }
                }
            }

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