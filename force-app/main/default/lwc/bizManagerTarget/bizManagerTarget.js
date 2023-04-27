import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactData from '@salesforce/apex/ExportDataController.getContacts';

export default class BizManagerTarget extends LightningElement {

    @api targetValue = 0;
    @track contactId = "";
    @track isEditMode = false;

    BDMList = [];

    get contactExists() {
        return this.contactId != "";
    }

    get targetYearValue() {
        if (this.BDMList && this.BDMList.length > 0) {
            return this.targetValue / this.BDMList.length;
        }
        return this.targetValue;
    }

    get BDManagers() {
        for (let bdm of this.BDMList) {
            bdm.targetValue = this.targetValue;
            if (this.targetValue > this.actual) {
                bdm.variance = this.targetValue - this.actual;
            }
            else if (this.targetValue < this.actual) {
                bdm.variance = this.actual - this.targetValue;
            }
        }
        return this.BDMList;
    }

    connectedCallback() {
        getContactData()
            .then(data => {
                let count = 0;
                let actual = 700;

                data.forEach((item) => {
                    let isSelected = false;
                    if (count == 0) {
                        isSelected = true;
                        this.contactId = item.Id;
                    }
                    this.BDMList.push({ ...item, actual: (actual + 10), variance: 0, isSelected: isSelected, targetValue: 0 });
                    count++;
                });
            })
            .catch(error => {
                console.log('error====>', this.error);
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while getting Records',
                        message: error.message,
                        variant: 'error'
                    }),
                );
            });
    }

    handleClick(event) {
        this.contactId = event.currentTarget.dataset.id;

        this.BDMList.forEach(element => {
            element.isSelected = false;
            if (element.Id == event.currentTarget.dataset.id) {
                element.isSelected = true;
            }
        });
    }
    handleClickEdit(event) {
        this.isEditMode = !this.isEditMode;
    }
}