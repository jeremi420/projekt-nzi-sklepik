import nodemailer from "nodemailer";
import models from "../models";

const User = models.User;

const confirmationEmail = (userId) => ({
    subject: "React Confirm Email",
    html: `
        <a href='http://localhost:3000/confirm/${userId}'>
            click to confirm email
        </a>
    `,
    text: `copy and paste this link: http://localhost:3000/confirm/${userId}`,
});

const credentials = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // These environment variables will be pulled from the .env file
        user: "sklepik.nzi@gmail.com",
        pass: "reksoh-Hiztaj-retfo8",
    },
};
const transporter = nodemailer.createTransport(credentials);

const sendEmail = async (to, content) => {
    const contacts = {
        from: "sklepik.nzi@gmail.com",
        to,
    };
    const email = {
        ...content,
        ...contacts,
    };
    await transporter.sendMail(email);
};

export const verify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        console.log(user.email);
        if (user && !user.confirmed) {
            await sendEmail(user.email, confirmationEmail(user.id));
            res.json({
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
        });
    }
};
export const confirm = async (req, res, next) => {
    try {
        const { id } = req.body;
        const user = await User.findByPk(id);
        if (user && !user.confirmed) {
            user.confirmed = true;
            await user.save();
            res.json({
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
        });
    }
};
