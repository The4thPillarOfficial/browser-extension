import * as Actions from '../store/constants';

export default class AuthenticationService {

    static isValidPassword(password, confirmation, context) {

        // Check for password length
        if (password.length < 8) {
            context[Actions.PUSH_ERROR]('Passwords must be at least 8 characters long.');

            return false;
        }

        // Check if password and password confirmation are the same
        if (password !== confirmation) {
            context[Actions.PUSH_ERROR]('Your password and confirmation password do not match.');

            return false;
        }

        return true;
    }
}
