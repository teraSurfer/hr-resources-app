module.exports = (sequelize, Sequelize) => {
    const Salaries = sequelize.define("employee_salaries", {
        employee_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salary: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        from_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        to_date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
    return Salaries;
}