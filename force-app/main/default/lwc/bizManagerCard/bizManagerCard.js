import { LightningElement, api } from 'lwc';

export default class BizManagerCard extends LightningElement {

    userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

    // Sample data
    /*bdmManager = {
        userSalutation:"Ms.",
        actual:"$100000", 
        variance:"$100000"
    };*/

    @api bdmManager;


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
        this.getuserImg(this.bdmManager.userSalutation);
    }

    getuserImg(salutation) {

        // Generate a random number between 1 and 100

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