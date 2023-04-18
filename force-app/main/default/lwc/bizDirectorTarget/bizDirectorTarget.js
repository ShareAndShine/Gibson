import { LightningElement } from 'lwc';

export default class BizDirectorTarget extends LightningElement {

    // properties
    currentFY;
    BDDName = 'Rachael Jones'

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

    connectedCallback()
    {
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
      

    
}