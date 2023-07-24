import decode from 'jwt-decode';

// Instantiate authentication service for users
class AuthService {

    // get user's data
    getProfile() {
        return decode(this.getToken());
    }

    // Check user is logged in
    loggedIn() {
        // Check for valid saved token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // Check token expiry
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default AuthService;
