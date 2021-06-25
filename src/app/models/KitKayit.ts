import { Uye } from './Uye';
import { Kutuphane } from './Kutuphane';
import { Kitaplar } from './Kitaplar';
export class KitKayit {

    kitKayitId: number;
    kitKayitKutupId: number;
    kitKayitKitapId: number;
    kitKayitUyeId: number;

    kutupbilgi: Kutuphane;
    kitapbilgi: Kitaplar;
    uyebilgi: Uye;
}