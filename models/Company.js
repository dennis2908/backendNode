module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    m_branch: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Company;
};
