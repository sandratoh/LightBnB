SELECT properties.*, AVG(rating) as average_rating
FROM property_reviews
JOIN properties ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;