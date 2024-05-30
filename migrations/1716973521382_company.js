/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

pgm.createTable("company", {
  id: "id",
  company_name: {
    type: "string",
    notNull: true
  },
  address: { type: "string", notNull: true },
  email: { type: "string", notNull: true },
  m_branch: {
    type: "integer",
    notNull: true,
    references: '"branch"',
    onDelete: "cascade"
  },
  phone: { type: "string", notNull: true },
  createdAt: {
    type: "timestamp",
    notNull: true,
    default: pgm.func("current_timestamp")
  }
});

exports.down = (pgm) => {};
