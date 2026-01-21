export function normalizePersianNumbers(value: string): string {
    if (!value) return value;

    return value
        // Persian digits (۰۱۲۳۴۵۶۷۸۹)
        .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
        // Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩)
        .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function convertPersianToEnglishDigits(str: string) {
    return str.replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}
