export class DhbUptake {
    public dhbName: string;
    public ethnicGroup: string;
    public ageGroup: string;
    public gender: string;
    public firstDoseAdministered: number;
    public secondDoseAdministered: number;
    public population: number;
    public firstDoseUptakePer1000: number;
    public secondDoseUptakePer1000: number;

    constructor(
        dbh: string,
        ethnicGroup: string, 
        ageGroup: string, 
        gender: string, 
        first: number, 
        second: number, 
        population: number, 
        first1000: number, 
        second1000: number) {
        this.dhbName = dbh;
        this.ethnicGroup = ethnicGroup;
        this.ageGroup = ageGroup;
        this.gender = gender;
        this.firstDoseAdministered = first;
        this.secondDoseAdministered = second;
        this.population = population;
        this.firstDoseUptakePer1000 = first1000;
        this.secondDoseUptakePer1000 = second1000;
    }

}