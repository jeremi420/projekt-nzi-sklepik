import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { promisify } from "util";

const saltRounds = 10;

const hashPassword = (person) => {
    if (!person.changed("password")) return;
    return bcrypt
        .hash(person.password, saltRounds)
        .then((hash) => (person.password = hash));
};

export default (sequelize) => {
    class User extends Model {
        async comparePassword(password) {
            const compare = promisify(bcrypt.compare);
            return await compare(password, this.password);
        }
        toJSON() {
            return {
                id: this.id,
                email: this.email,
            };
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: DataTypes.STRING,
            facebookId: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: "users",
            hooks: {
                beforeCreate: hashPassword,
                beforeUpdate: hashPassword,
            },
        }
    );
    return User;
};
