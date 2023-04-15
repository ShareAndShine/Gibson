import { LightningElement, api } from 'lwc';
export default class SalesPerformanceManagement extends LightningElement {
    tableData = "10000000";
    columns = [{ label: "Flight", type: "text", fieldName: "Flight", typeAttributes: { variant: "base", label: "", menuAlignment: "right", target: "", linkify: true }, cellAttributes: { alignment: "left" } }, { label: "Route", type: "text", fieldName: "Route", typeAttributes: {}, cellAttributes: {} }, { typeAttributes: {}, cellAttributes: {}, label: "When", type: "text", fieldName: "When" }];
    selectedRows = [];
    tableData1 = "10";
    columns1 = [{ label: "Name", type: "text", fieldName: "name" }, { label: "Created By", type: "text", fieldName: "createdBy" }];
    
    /*tableData2 = [{ name: "Sandy Moen", april: 0, phone: "550 534-7753 x7232", amount: "270.63", closeAt: "2022-02-15" }, { name: "Janet Funk", website: "http://nathanial.org", phone: "(890) 874-1553", amount: "93.04", closeAt: "2022-04-13" }];
    columns2 = [{ label: "BU", fieldName: "name", type: "text", typeAttributes: {} }, { label: "April", fieldName: "april", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }, { label: "Phone", fieldName: "phone", type: "phone" }, { label: "Balance", fieldName: "amount", type: "currency" }, { label: "CloseAt", fieldName: "closeAt", type: "date" }];
    */
    tableData2 = [
        { name: "Epiphone", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september23: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "Acoustic", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "Custom", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "USA", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "KRK", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "LifeStyle", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "Steinberger", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
        , { name: "Total", april23: 0, may23: 0, june23: 0, july23: 0, august23: 0, september: 0, october23: 0, november23: 0, december23: 0, january24: 0, feb24: 0, mar24: 0 }
    ];
    columns2 = [
        { label: "BU", fieldName: "name", type: "text", typeAttributes: {} }
        , { label: "April", fieldName: "april23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "May", fieldName: "may23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "June", fieldName: "june23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "July", fieldName: "july23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "August", fieldName: "august23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "September", fieldName: "september23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "October", fieldName: "october23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "November", fieldName: "november23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "December", fieldName: "december23", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "January", fieldName: "january24", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "Febuary", fieldName: "feb24", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
        , { label: "March", fieldName: "mar24", type: "number", typeAttributes: {}, iconName: "utility:monthlyview", editable: true, sortable: true }
    ];

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