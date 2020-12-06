import nodemailer from "nodemailer";

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

export const sendEmail = async (to, content) => {
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
