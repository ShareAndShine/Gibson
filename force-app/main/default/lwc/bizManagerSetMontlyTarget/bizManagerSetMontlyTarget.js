import { LightningElement } from 'lwc';

export default class BizManagerSetMontlyTarget extends LightningElement {

    tableData3 = [
        { month: "April", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "May", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "June", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "July", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "August", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "September", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "October", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "November", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "December", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "January", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "Febuary", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }
        , { month: "March", Epiphone: 0, Acoustic: 0, Custom: 0, USA: 0, KRK: 0, LifeStyle: 0, Steinberger: 0, Total: 0 }

    ];


    columns3 = [
        { label: "Month", fieldName: "month", type: "text", typeAttributes: {} }
        , { label: "Epiphone", fieldName: "Epiphone", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "Acoustic", fieldName: "Acoustic", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "Custom", fieldName: "Custom", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "USA", fieldName: "USA", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "KRK", fieldName: "KRK", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "LifeStyle", fieldName: "LifeStyle", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "Steinberger", fieldName: "Steinberger", type: "number", editable: true, sortable: true, cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right', class: 'slds-text-wrap' }, typeAttributes: {} }
        , { label: "Total", fieldName: "Total", type: "number", cellAttributes: { alignment: 'center', iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }, typeAttributes: {} }
    ];
}