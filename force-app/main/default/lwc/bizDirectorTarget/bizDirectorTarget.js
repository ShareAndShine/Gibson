import { LightningElement, track, api } from 'lwc';
import getSalesTargetBDMData from '@salesforce/apex/ExportDataController.salesTarBDM';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BizDirectorTarget extends LightningElement {

    currentFY;
    valueFY = 'FY-23';
    BDDName = 'Rachael Jones';

    @track error;
    @track data;
    @api currentFYValue = 0;

    get optionsFY() {
        return [
            { label: 'FY-20', value: 'FY-20' },
            { label: 'FY-21', value: 'FY-21' },
            { label: 'FY-22', value: 'FY-22' },
            { label: 'FY-23', value: 'FY-23' },
        ];
    }

    constructor() {
        super();
        this.getSalesTargetBDM();
    }

    getSalesTargetBDM() {
        getSalesTargetBDMData()
            .then(result => {
                this.data = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while getting Accounts',
                        message: error.message,
                        variant: 'error'
                    }),
                );
                this.data = undefined;
            });
    }

    downloadCSVFile() {
        let rowEnd = '\n';
        let csvString = '';
        // this set elminates the duplicates if have any duplicate keys
        let rowData = new Set();

        // getting keys from data
        this.data.forEach(function (record) {
            Object.keys(record).forEach(function (key) {
                rowData.add(key);
            });
        });

        // Array.from() method returns an Array object from any object with a length property or an iterable object.
        rowData = Array.from(rowData);

        // splitting using ','
        csvString += rowData.join(',');
        csvString += rowEnd;

        // main for loop to get the data based on key value
        for (let i = 0; i < this.data.length; i++) {
            let colValue = 0;

            // validating keys in data
            for (let key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    // Key value 
                    // Ex: Id, Name
                    let rowKey = rowData[key];
                    // add , after every value except the first.
                    if (colValue > 0) {
                        csvString += ',';
                    }
                    // If the column is undefined, it as blank in the CSV file.
                    let value = this.data[i][rowKey] === undefined ? '' : this.data[i][rowKey];
                    csvString += '"' + value + '"';
                    colValue++;
                }
            }
            csvString += rowEnd;
        }

        // Creating anchor element to download
        let downloadElement = document.createElement('a');

        // This  encodeURI encodes special characters, except: , / ? : @ & = + $ # (Use encodeURIComponent() to encode these characters).
        downloadElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
        downloadElement.target = '_self';
        // CSV File Name
        downloadElement.download = 'Sales Target BDM.csv';
        // below statement is required if you are using firefox browser
        document.body.appendChild(downloadElement);
        // click() Javascript function to download CSV file
        downloadElement.click();
    }

    handleInputFocus(event) {
        // modify parent to properly highlight visually
        const classList = event.target.parentNode.classList;
        classList.add('lgc-highlight');
    }

    handleInputBlur(event) {
        // modify parent to properly remove highlight
        const classList = event.target.parentNode.classList;
        classList.remove('lgc-highlight');
    }

    connectedCallback() {
        // calculate current financial year
        this.getCurrentFinancialYear();
    }

    getCurrentFinancialYear() {
        var fiscalyear = "";
        var today = new Date();
        if ((today.getMonth() + 1) <= 3) {
            fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
        } else {
            fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
        }
        this.currentFY = fiscalyear;
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handleFYValue(event) {
        this.currentFYValue = event.target.value;
        const selectedEvent = new CustomEvent("progressvaluechange", {
            detail: this.currentFYValue
        });
        this.dispatchEvent(selectedEvent);
    }
}