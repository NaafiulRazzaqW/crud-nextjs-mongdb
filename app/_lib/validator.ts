
export function Email(email: string){
    const regexcheck = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "g");
    const regexmatch = regexcheck.test(email);

    return !regexmatch
}

export function Required(string: string){
    return string.length == 0;
}

export function Min(string: string, min: number){
    return string.length <= min
}

