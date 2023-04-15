import { LightningElement } from 'lwc';

export default class BizManagerCard extends LightningElement {

    userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';


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
        this.getuserImg("Ms.");
    }

    getuserImg(salutation) {

        // Generate a random number between 1 and 100

        const randomId = Math.floor(Math.random() * 100);

        switch (salutation) {
            case "Mr.":
                this.userImg = `https://randomuser.me/api/portraits/med/men/${randomId}.jpg`;
                break;
            case "Ms.":
                // code block
                this.userImg = `https://randomuser.me/api/portraits/med/women/${randomId}.jpg`;
                break;
            default:
                this.userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                break;
        }
    }
}