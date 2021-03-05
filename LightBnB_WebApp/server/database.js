const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('./db/index.js');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    `;
  
  return db
    .query(queryString, [email])
    .then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1
    `;
  
  return db
    .query(queryString, [id])
    .then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  
  return db
    .query(queryString, [user.name, user.email, user.password])
    .then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT properties.*, reservations.*, AVG(rating) as average_rating
    FROM reservations
    JOIN properties ON property_id = properties.id
    JOIN property_reviews ON reservations.id = reservation_id
    WHERE reservations.guest_id = $1
      AND end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    LIMIT $2
    `;

  return db
    .query(queryString, [guest_id, limit])
    .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/**
 * Create new reservation for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const makeReservation = function(reservation) {
  const queryString = `
    
    `;

  return db
    .query(queryString, [ -- ])
    .then(res => res.rows);
};
exports.makeReservation = makeReservation;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  let clause;
  const findQueryClause = arr => arr.length === 1 ? clause = 'WHERE' : clause = 'AND';

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    findQueryClause(queryParams);
    queryString += `${clause} owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    findQueryClause(queryParams);
    queryString += `${clause} cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    findQueryClause(queryParams);
    queryString += `${clause} cost_per_night <= $${queryParams.length} `;
  }
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    findQueryClause(queryParams);
    queryString += `${clause} rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return db
    .query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (
    owner_id
    , title
    , description
    , thumbnail_photo_url
    , cover_photo_url
    , cost_per_night
    , parking_spaces
    , number_of_bathrooms
    , number_of_bedrooms
    , country
    , street
    , city
    , province
    , post_code)
  VALUES (
    $1
    , $2
    , $3
    , $4
    , $5
    , $6
    , $7
    , $8
    , $9
    , $10
    , $11
    , $12
    , $13
    , $14
  )
  RETURNING *
  `;
  
  const queryParams = [
    property.owner_id
    , property.title
    , property.description
    , property.thumbnail_photo_url
    , property.cover_photo_url
    , property.cost_per_night
    , property.parking_spaces
    , property.number_of_bathrooms
    , property.number_of_bedrooms
    , property.country
    , property.street
    , property.city
    , property.province
    , property.post_code
  ];

  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0]);
};
exports.addProperty = addProperty;
