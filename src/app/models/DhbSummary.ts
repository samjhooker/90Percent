export class DhbSummary {
    dhbName: string;
    totalPopulation = 0;
    totalFirstDoses = 0;
    totalSecondDoses = 0;

    constructor (dhbName: string) {
        this.dhbName = dhbName;
    }
}