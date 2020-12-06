import { Sequelize } from "sequelize";

import User from "./user";

export const sequalize = new Sequelize("docker", "docker", "docker", {
    dialect: "postgres",
    host: "postgres",
});

const models = {
    User,
};

Object.keys(models).map((key) => {
    models[key] = models[key](sequalize);
});

export default models;
