export const getCookie = (cName: string): string => {
    const name = cName + '='
    const cDecoded = decodeURIComponent(document.cookie); // to be careful    
    const cArr = cDecoded.split('; ');
    
    let res: string = '';
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) {            
            res = val.substring(name.length);
        }
    })
    return res;
}

