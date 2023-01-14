


export function transliterateEnglish(word) {
    let result = '';

    const converter = {
        'щ': 'sch',

        'ё': 'yo', 'ж': 'zh', 'ч': 'ch', 'ш': 'sh', 'ю': 'yu', 'я': 'ya', 'ь': 'wb',

        'ъ': 'w', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k',
        'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'h', 'ц': 'c', 'ы': 'y',
    };

    for(let i = 0; i < word.length; i++) {
        let c = word.charAt(i);

        result += converter[c] || c;
    }

    return result;
}

export function transliterateRussian(word) {
    const converter = {
        'sch': 'щ',

        'yo': 'ё', 'zh': 'ж', 'ch': 'ч', 'sh': 'ш', 'yu': 'ю', 'ya': 'я', 'wb': 'ь',

        'w':'ъ', 'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
        'e': 'е', 'z': 'з', 'i': 'и', 'j': 'й', 'k': 'к',
        'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п',
        'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф',
        'h': 'х', 'c': 'ц', 'y': 'ы',
    };

    for (const [key, value] of Object.entries(converter)) {
        word = word.replaceAll(key, value);
    }

    return word;
}