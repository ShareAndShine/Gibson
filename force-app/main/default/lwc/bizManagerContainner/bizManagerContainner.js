import { api, LightningElement } from 'lwc';

export default class BizManagerContainner extends LightningElement {
    value = 'New York';

    @api targetValue;

    get optionsRegion() {
        return [
            { label: 'America (West)', value: 'Atlanta' },
            { label: 'America (North)', value: 'Los Angeles' },
            { label: 'America (South)', value: 'Chicago' },
            { label: 'America (East)', value: 'Manchester' },
            { label: 'Europe', value: 'New York' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}