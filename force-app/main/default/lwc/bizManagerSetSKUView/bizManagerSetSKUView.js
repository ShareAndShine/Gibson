import { LightningElement,api,wire,track } from 'lwc';
import getSalesTargetData from '@salesforce/apex/ExportDataController.getSalesTargetQuatBDM';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class BizManagerSetSKUView extends LightningElement {
    _contactId = '';
    wiredMyApexMethodResult;

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

    @track salesTardata = {};

    get columns() {
        return [
            { label: "SKU", fieldName: "busUnit", type: "text", typeAttributes: {} },
            { label: "Description", fieldName: "Q1", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Business Unit", fieldName: "Q2", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Unit Price", fieldName: "Q3", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Total Orders", fieldName: "Q4", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Total Price", fieldName: "total", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        ];
    }

    @wire(getSalesTargetData, { contactId: '$contactId' })
    wiredMyApexMethod(result) {
        this.wiredMyApexMethodResult = result;
        if (result.data) {
            // Handle successful data retrieval
            this.salesTardata = [];

            for (let busUnit in result.data) {
                let salesTar = { ...result.data[busUnit], "busUnit": busUnit, "total": 0 };
                for (let quarter in result.data[busUnit]) {
                    salesTar.total += result.data[busUnit][quarter];
                }
                this.salesTardata.push(salesTar);
            }

            console.log('data====>', JSON.stringify(this.salesTardata));
            this.error = undefined;
        } else if (result.error) {
            // Handle error
            console.log('data===>', result.error);
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


}