export const emailConfirmation = (userId) => ({
    subject: "React Confirm Email",
    html: `
        <a href='http://localhost:3000/verify/${userId}'>
            click to confirm email
        </a>
    `,
    text: `copy and paste this link: http://localhost:3000/verify/${userId}`,
});
