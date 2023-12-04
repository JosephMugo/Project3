const dbClient = require("../db/client");

class UserAccountDetailsRepository {
  constructor() {}

  async insert(
    userID,
    firstName,
    lastName,
    address,
    secondaryAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    email
  ) {
    const sql = `INSERT INTO user_account_details (user_id, first_name, last_name, address_1, address_2, city, state, zip_code, phone_number, email) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [
      userID,
      firstName,
      lastName,
      address,
      secondaryAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      email,
    ];
    const results = await dbClient.query(sql, values);
    return results.rows[0];
  }

  async select(userID) {
    const sql = `SELECT user_id, first_name, last_name, address_1, address_2, city, state, zip_code, phone_number, email FROM user_account_details WHERE user_id = $1`;
    const values = [userID];
    const results = await dbClient.query(sql, values);
    return results.rows[0];
  }

  async update(
    userID,
    firstName,
    lastName,
    address,
    secondaryAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    email
  ) {
    const sql = `UPDATE user_account_details SET first_name = $2, last_name = $3, address_1 = $4, address_2 = $5, city = $6, state = $7, zip_code = $8, phone_number = $9, email = $10 WHERE user_id = $1 RETURNING *`;
    const values = [
      userID,
      firstName,
      lastName,
      address,
      secondaryAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      email,
    ];
    const results = await dbClient.query(sql, values);
    return results.rows[0];
  }
}

module.exports = UserAccountDetailsRepository;
