export function getCurrencySymbol(isoCode) {
    var codeMap = {
        ALL: "Lek",
        AFN: "؋",
        ARS: "$",
        AWG: "ƒ",
        AUD: "$",
        AZN: "ман",
        BSD: "$",
        BBD: "$",
        BYN: "Br",
        BZD: "BZ$",
        BMD: "$",
        BOB: "$b",
        BAM: "KM",
        BWP: "P",
        BGN: "лв",
        BRL: "R$",
        BND: "$",
        KHR: "៛",
        CAD: "$",
        KYD: "$",
        CLP: "$",
        CNY: "¥",
        COP: "$",
        CRC: "₡",
        HRK: "kn",
        CUP: "₱",
        CZK: "Kč",
        DKK: "kr",
        DOP: "RD$",
        XCD: "$",
        EGP: "£",
        SVC: "$",
        EUR: "€",
        FKP: "£",
        FJD: "$",
        GHS: "¢",
        GIP: "£",
        GTQ: "Q",
        GGP: "£",
        GYD: "$",
        HNL: "L",
        HKD: "$",
        HUF: "Ft",
        ISK: "kr",
        INR: "₹",
        IDR: "Rp",
        IRR: "﷼",
        IMP: "£",
        ILS: "₪",
        JMD: "J$",
        JPY: "¥",
        JEP: "£",
        KZT: "лв",
        KPW: "₩",
        KRW: "₩",
        KGS: "лв",
        LAK: "₭",
        LBP: "£",
        LRD: "$",
        MKD: "ден",
        MYR: "RM",
        MUR: "₨",
        MXN: "$",
        MNT: "₮",
        MZN: "MT",
        NAD: "$",
        NPR: "₨",
        ANG: "ƒ",
        NZD: "$",
        NIO: "C$",
        NGN: "₦",
        KPW: "₩",
        NOK: "kr",
        OMR: "﷼",
        PKR: "₨",
        PAB: "B/.",
        PYG: "Gs",
        PEN: "S/.",
        PHP: "₱",
        PLN: "zł",
        QAR: "﷼",
        RON: "lei",
        RUB: "₽",
        SHP: "£",
        SAR: "﷼",
        RSD: "Дин.",
        SCR: "₨",
        SGD: "$",
        SBD: "$",
        SOS: "S",
        ZAR: "R",
        KRW: "₩",
        LKR: "₨",
        SEK: "kr",
        CHF: "CHF",
        SRD: "$",
        SYP: "£",
        TWD: "NT$",
        THB: "฿",
        TTD: "TT$",
        TVD: "$",
        UAH: "₴",
        GBP: "£",
        USD: "$",
        UYU: "$U",
        UZS: "лв",
        VEF: "Bs",
        VND: "₫",
        YER: "﷼",
        ZWD: "Z$",
        KWD: "ك",
        PGK: "K",
        MOP: "MOP$",
        WST: "$",
        TOP: "T$",
        AED: "د.إ"
    };
    return codeMap[isoCode];
}