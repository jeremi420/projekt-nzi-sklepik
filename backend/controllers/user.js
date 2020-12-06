import models from "../models";
import jwt from "jsonwebtoken";
import { response } from "express";
import { sendEmail } from "../utils/email";
import { emailConfirmation } from "../templates/email";

const User = models.User;

const secret = "bla";

const isValidUser = (request) => {
    if (request) {
        const email = request.body.email || "";
        const password = request.body.password || "";
        const firstName = request.body.firstName || "";
        const lastName = request.body.lastName || "";
        if (email && password && firstName && lastName) {
            return true;
        }
    }
    return false;
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "uzytkownik nie istnieje",
        });
    }
    if (!(await user.comparePassword(password))) {
        return res.status(401).json({
            success: false,
            message: "nieprawidlowe haslo",
        });
    }
    res.status(200).json({
        success: true,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 }),
        redirect: "/",
        user: user.toJSON(),
    });
};
export const signUp = async (req, res, next) => {
    const email = req.body.email || null;
    if (isValidUser(req)) {
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                const newUser = await User.create({
                    email,
                    password: req.body.password || null,
                    firstName: req.body.firstName || null,
                    lastName: req.body.lastName || null,
                });
                await sendEmail(email, emailConfirmation(newUser.id));
                res.status(200).json({
                    success: true,
                    token: jwt.sign({ id: newUser.id }, secret, {
                        expiresIn: 60 * 60,
                    }),
                    redirect: "/",
                    user: newUser.toJSON(),
                });
            } else {
                response.status(401).json({
                    success: false,
                    message: "uzytkownik juz istnieje",
                });
            }
        } catch (e) {
            res.status(401).json({
                success: false,
                message: e.message,
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: "nieprawidlowe dane",
        });
    }
};
