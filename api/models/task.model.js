module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING
        },
        extraText: {
            type: Sequelize.TEXT, //Used TEXT instead of STRING to allow for longer descriptions
            allowNull: true, //For empty descriptions
        },
        completed: {
            type: Sequelize.BOOLEAN
        }

    });
  
    return Task;
};