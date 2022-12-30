export const isEmailAddress = (str) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  // returns a boolean 
}

export const isPasswordValid = ( str ) => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return pattern.test(str);  
}
export const isAlphabatic = ( str ) => {
    const pattern = /^[a-zA-Z ]*$/;
    return pattern.test(str);  
}