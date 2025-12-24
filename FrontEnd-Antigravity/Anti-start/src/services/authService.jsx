/**
 * authService.jsx
 * 
 * Standalone authentication service using localStorage.
 * Handles user registration and login without external API dependencies.
 */

const USERS_STORAGE_KEY = 'skillforge_local_users';

const getLocalUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};

const saveLocalUsers = (users) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const authService = {
    async login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getLocalUsers();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    resolve({
                        ...userWithoutPassword,
                        token: `mock-jwt-token-${user.email}`,
                    });
                } else {
                    reject(new Error("Invalid email or password"));
                }
            }, 300);
        });
    },

    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getLocalUsers();
                if (users.some(u => u.email === userData.email)) {
                    reject(new Error("User already exists with this email"));
                    return;
                }

                const newUser = {
                    ...userData,
                    userId: Date.now(),
                    created_at: new Date().toISOString()
                };

                users.push(newUser);
                saveLocalUsers(users);

                const { password, ...userWithoutPassword } = newUser;
                resolve({
                    ...userWithoutPassword,
                    token: `mock-jwt-token-${newUser.email}`
                });
            }, 300);
        });
    },

    logout() {
        localStorage.removeItem("skillforge_token");
        localStorage.removeItem("skillforge_user");
        localStorage.removeItem("skillforge_role");
    }
};
