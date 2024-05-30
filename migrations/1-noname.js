"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "companies", deps: []
 *
 **/

var info = {
  revision: 1,
  name: "noname",
  created: "2024-05-29T09:36:06.293Z",
  comment: ""
};

var migrationCommands = function (transaction) {
  return [
    {
      fn: "createTable",
      params: [
        "companies",
        {
          id: {
            type: Sequelize.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true
          },
          email: {
            type: Sequelize.STRING,
            field: "email",
            allowNull: false
          },
          company_name: {
            type: Sequelize.STRING,
            field: "company_name",
            allowNull: false
          },
          address: {
            type: Sequelize.STRING,
            field: "address",
            allowNull: false
          },
          m_branch: {
            type: Sequelize.INTEGER,
            field: "m_branch",
            allowNull: false
          },
          phone: {
            type: Sequelize.STRING,
            field: "phone",
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            field: "createdAt",
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            field: "updatedAt",
            allowNull: false
          }
        },
        {
          transaction: transaction
        }
      ]
    }
  ];
};
var rollbackCommands = function (transaction) {
  return [
    {
      fn: "dropTable",
      params: [
        "companies",
        {
          transaction: transaction
        }
      ]
    }
  ];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function (queryInterface, Sequelize, _commands) {
    var index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function (resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn]
              .apply(queryInterface, command.params)
              .then(next, reject);
          } else resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info
};
