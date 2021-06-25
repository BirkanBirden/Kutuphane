import { Time } from "@angular/common";
import { Kutuphane } from "./Kutuphane";

export class Saat {

    SaatId: number;
    Saatler: Date;
    SaatKisi: number;
    SaatDurum: string;
    SaatKutupId: number;
    kutupbilgi: Kutuphane;
}