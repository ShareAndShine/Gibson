import { LightningElement, api, track } from 'lwc';

export default class BizManagerCard extends LightningElement {

    userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

    @api bdmManager;
    @api targetValue = 0;

    @track actual = 0;
    @track variance = 0;

    connectedCallback() {
        this.actual = this.bdmManager.actual;
        this.variance = '$' + this.bdmManager.variance;
    }

    handleChange(event) {
        console.log(event.detail.value);
        let varianceVal = this.actual - Number(event.detail.value);
        if (varianceVal < 0) {
            this.variance = '$(' + (-1 * varianceVal) + ')';
        }
        else {
            this.variance = '$(' + varianceVal + ')';
        }

        //this.bdmManager.variance = event.detail.value;
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
        //using open api dynamically generate img  based on salutation 
        this.getuserImg(this.bdmManager.Salutation);
    }

    getuserImg(salutation) {
        const randomId = Math.floor(Math.random() * 100);

        switch (salutation) {
            case "Mr.":
                this.userImg = `https://randomuser.me/api/portraits/thumb/men/${randomId}.jpg`;
                break;
            case "Ms.":
                // code block
                this.userImg = `https://randomuser.me/api/portraits/thumb/women/${randomId}.jpg`;
                break;
            default:
                this.userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                break;
        }
    }
}