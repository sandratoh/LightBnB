module.exports = function(router, database) {

  router.get('/properties', (req, res) => {
    database.getAllProperties(req.query, 20)
      .then(properties => res.send({properties}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllReservations(userId)
      .then(reservations => res.send({reservations}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post('/reservations', (req, res) => {
    const userId = req.session.userId;
    // need to set property id cookie after clicking to page
    // const propertyId = req.session.propertyId;
    // database.makeReservation({...req.body, guest_id: userId, property_id: propertyId})
    database.makeReservation({...req.body, guest_id: userId, property_id: 1})
      .then(reservation => {
        res.send(reservation);
        // req.session.propertyId = null;
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
}