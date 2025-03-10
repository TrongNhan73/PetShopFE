const validateEmail = (email: string) => {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

const validatePhone = (phone: string) => {

    let regex = /^\d{10,11}$/;
    return regex.test(phone);
};


const validatePassword = (password: string) => {
    return password.length > 5 ? true : false;
};


export {
    validateEmail,
    validatePassword,
    validatePhone
}