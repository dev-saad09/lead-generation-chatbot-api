const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const log = require("../../logger");
const { User } = require("../../models");

class UserService {
    async addUser(payload) {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        // Create user
        const user = await User.query().insert({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role
        });

        return user;
    }

    async getUsers() {
        const users = await User.query().select(
            User.query().getAllColumns().filter(col => col !== "password")
        );
        return users;
    }

    async getUserById(id) {
        const user = await User.query()
            .findById(id)
            .select(User.query().getAllColumns().filter(col => col !== "password"));

        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async updateUser(id, payload) {
        const user = await User.query().findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        // If password is being updated, hash it
        if (payload.password) {
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
        }

        const updatedUser = await User.query().patchAndFetchById(id, payload);
        return updatedUser;
    }

    async deleteUser(id) {
        const user = await User.query().findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        await User.query().deleteById(id);
        return { id };
    }

    async loginUser(payload) {
        const user = await User.query().findOne({
            email: payload.email
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(payload.password, user.password);
        if (!validPassword) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return { token, user: { id: user.id, email: user.email, role: user.role } };
    }

    async forgotPassword(payload) {
        const user = await User.query().findOne({
            email: payload.email
        });

        if (!user) {
            throw new Error("User not found");
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Here you would typically send an email with the reset link
        // For now, just return the token
        return { token };
    }

    async resetPassword(payload) {
        const decoded = jwt.verify(payload.token, process.env.JWT_SECRET);
        const user = await User.query().findById(decoded.id);

        if (!user) {
            throw new Error("Invalid token");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt);

        await User.query().patchAndFetchById(decoded.id, { password: hashedPassword });
        return { message: "Password reset successful" };
    }
}

module.exports = new UserService();
