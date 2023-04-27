import { LightningElement,api,track,wire } from 'lwc';
import getProductOrderData from '@salesforce/apex/ExportDataController.getProductOrder';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class BizManagerProductView extends LightningElement {
    @track isEditTardata =false;
    @api salesTardata = {};
    @track searchKey;
    @track initialRecords;

    pageSizeOptions = [5, 10, 25, 50, 75, 100]; 
    totalRecords = 0; 
    pageSize; 
    totalPages;
    pageNumber = 1;    
    recordsToDisplay = []; 

    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }


    get columns() {
        return [
            { label: "SKU", fieldName: "Name", type: "text", typeAttributes: {} },
            { label: "Description", fieldName: "Description__c", type: "text", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Business Unit", fieldName: "Sales_Business_Unit", type: "text", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Unit Price", fieldName: "Unit_Price__c", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Total Orders", fieldName: "Total_Orders__c", type: "Number", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} },
            { label: "Total Price", fieldName: "Total_Price__c", type: "currency", editable: this.isEditTardata, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        ];
    }

    @wire(getProductOrderData)
    wiredMyApexMethod(result) {
        this.wiredMyApexMethodResult = result;
        if (result.data) {
            let busUnitName = JSON.parse(JSON.stringify(result.data));
            busUnitName.forEach(name=>{
                if(name.Sales_Business_Unit__c){
                    name.Sales_Business_Unit = name.Sales_Business_Unit__r.Name
                }
            })
            this.salesTardata = busUnitName;
            this.totalRecords = result.data.length; // update total records count                 
            this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
            this.paginationHelper(); // cal

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
    handleChange(){
        this.isEditTardata = !this.isEditTardata;
    }

    // handleKeywordChange(event){
    //     const searchKey = event.target.value.toLowerCase();
 
    //     if (searchKey) {
    //         this.salesTardata = this.initialRecords;
    //         console.log('searchKey',this.salesTardata)
 
    //         if (this.salesTardata) {
    //             console.log('searchKey')
    //             let searchRecords = [];
 
    //             for (let record of this.salesTardata) {
    //                 let valuesArray = Object.values(record);
 
    //                 for (let val of valuesArray) {
    //                     console.log('val is ' + val);
    //                     let strVal = String(val);
 
    //                     if (strVal) {
    //                         if (strVal.toLowerCase().includes(searchKey)) {
    //                             searchRecords.push(record);
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //             console.log('Matched Accounts are ' + JSON.stringify(searchRecords));
    //             this.salesTardata = searchRecords;
    //         }
    //     } else {
    //         this.salesTardata = this.initialRecords;
    //     }
    // }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }
    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }
    // JS function to handel pagination logic 
    paginationHelper() {
        console.log('pagination:')
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.salesTardata[i]);
            console.log('pagination:',JSON.stringify(this.recordsToDisplay))
        }
    }    


}