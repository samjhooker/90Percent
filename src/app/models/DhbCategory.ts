
export class DhbCategory {
    categoryName: string;
    totalPopulation = 0;
    totalFirstDoses = 0;
    totalSecondDoses = 0;

    constructor (categoryName: string) {
        this.categoryName = categoryName;
    }

    getFirstDosePercentage(): string {
        return this.totalPopulation ? (this.totalFirstDoses/this.totalPopulation * 100).toFixed(2) + '%' : '0%';
    }

    getSecondDosePercentage(): string {
        return this.totalPopulation ? (this.totalSecondDoses/this.totalPopulation * 100).toFixed(2) + '%' : '0%';
    }

    getMoreUntil90Percent() : string {
        const val = (0.9 * this.totalPopulation) - this.totalSecondDoses;
        return val > 0 ? Math.trunc(val).toString() : '0';
    }
}