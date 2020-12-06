import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/user";
import emailRouter from "./routes/email";
import models, { sequalize } from "./models";
import passport from "./passport";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.get("/test", passport.authenticate("jwt", { session: false }), (req, res) =>
    res.send("hello world")
);

app.use("/users", userRouter);
app.use("/email", emailRouter);

const eraseDatabaseOnSync = true;
const port = process.env.PORT;
sequalize.sync({ force: eraseDatabaseOnSync }).then(() => {
    console.log("connected to database");
    if (eraseDatabaseOnSync) {
        craeteUser();
    }
    app.listen(port, () => {
        console.log(`app is listening on port: ${port}`);
    });
});

const craeteUser = async () => {
    const user = models.User.build({
        email: "jeremiwielewski@wp.pl",
        password: "jeremi",
    });
    await user.save();
};
