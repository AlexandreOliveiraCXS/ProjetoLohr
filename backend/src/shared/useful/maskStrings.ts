

export function removeSpecialChar(str: string): string {
    const regex = /[^0-9]/gi;
    return str.replace(regex, '');
}

export function zipCode(str: string): string {
    let value = str;

    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");

    return value;
}

export function cpf(str: string): string {
    let value = str;

    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");

        value = value;
    }
    return value;
}

export function phone(str: string): string {

    let value = str;
    value = value.replace(/\D/g, "");

    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "($1)$2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;
}


// cpf: "026.055.980-63"
// phone: "(054)99193-3727"
// rg: "1110392311"
// city: "Caxias do Sul"
// complement: ""
// country: ""
// email: "alexandre.c.oliveira@hotmail.com"
// maritalStatus: "Rio Grande do Sul"
// name: "Alexandre Custodio de Oliveira"
// nationality: ""
// neighborhood: ""
// number: "135"
// occupation: ""
// state: ""
// street: "Rua Cristiano Ramos de Oliveira"
// zipCode: "95110-372"