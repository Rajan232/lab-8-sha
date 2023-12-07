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
        extradescription: {
            type: Sequelize.TEXT
        },
        completed: {
            type: Sequelize.BOOLEAN
        }

    });
  
    return Task;
};