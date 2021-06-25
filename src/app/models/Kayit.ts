import { Saat } from './Saat';
import { Kutuphane } from './Kutuphane';
import { Uye } from './Uye';
export class Kayit {
    kayitId: number;
    kayitKutupId: number;
    kayitUyeId: number;
    kayitTarihId: number;
    uyebilgi: Uye;
    kutupbilgi: Kutuphane;
    saatbilgi: Saat;

}