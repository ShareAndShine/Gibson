import { LightningElement, track } from 'lwc';

export default class TargetMasterContainner extends LightningElement {

    @track targetValue = 0;

    hanldeProgressValueChange(event) {
        this.targetValue = event.detail;
    }

}