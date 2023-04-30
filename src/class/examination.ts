export class Examination {
    libelle: string;
    result: string;

    constructor(libelle: string = "", result: string = "") {
        this.libelle = libelle;
        this.result = result;
    }
}