import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactData from '@salesforce/apex/ExportDataController.getContacts';

export default class BizManagerList extends LightningElement {
    @track BDMList = [];

    connectedCallback() {
        getContactData()
            .then(data => {
                let count = 0;

                data.forEach((item) => {
                    let isSelected = false;
                    if (count == 0) {
                        isSelected = true;
                    }
                    this.BDMList.push({ ...item, actual: 0, variance: 0, isSelected: isSelected });
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

    // @track businessDevelopmentManagers = [
    //     { Id: "1", userSalutation: "Ms.", name: "Amy Jackson", actual: "$100000", variance: "$100000", isSelected: true },
    //     { Id: "2", userSalutation: "Mr.", name: "Mike Thomson", actual: "$95621", variance: "$145682", isSelected: false },
    //     { Id: "3", userSalutation: "Ms.", name: "Amy Jackson", actual: "$100000", variance: "$100000", isSelected: false },
    //     { Id: "4", userSalutation: "Mr.", name: "Mike Thomson", actual: "$95621", variance: "$145682", isSelected: false },
    //     { Id: "5", userSalutation: "Ms.", name: "Amy Jackson", actual: "$100000", variance: "$100000", isSelected: false },
    //     { Id: "6", userSalutation: "Mr.", name: "Mike Thomson", actual: "$95621", variance: "$145682", isSelected: false },
    // ];

    handleClick(event) {
        this.BDMList.forEach(element => {
            element.isSelected = false;
            if (element.Id == event.currentTarget.dataset.id) {
                element.isSelected = true;
            }
        });
    }

}