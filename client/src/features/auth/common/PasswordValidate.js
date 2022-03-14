import { MIN_LENGTH_OF_PASSWORD, MAX_LENGTH_OF_PASSWORD } from "../../../constant/system_variable"
export const passwordValidate = (password) => {
    // Minimum MIN and maximum MAX characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (MIN_LENGTH_OF_PASSWORD <= password.length <= MAX_LENGTH_OF_PASSWORD) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
        return re.test(password);
    }
    return false
}