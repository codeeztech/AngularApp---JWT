
const router = require('express').Router();
let Flight = require('../models/flight_schema');


router.route('/').get((req, res) => {
    Flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    const _flightId = req.params.id;
    Flight.find({ _id: _flightId })
    .then(flights => res.json(flights))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    newFlightData = ({
        id : req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        from: req.body.from,
        to: req.body.to,
        flight_type: req.body.flight_type,
        emailId: req.body.emailId,
        mobile: req.body.mobile,
        active: req.body.active,
    });
  const newFlight = new Flight(newFlightData);

  newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    const id = req.params.id;
   
  Flight.updateOne({_id:id},req.body)
    .then(() => res.json('Flight updated!')).then(()=>{
        Flight.find()
        .then(flights => res.json(flights))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    const _flightId = req.params.id;
    Flight.deleteOne({ _id: _flightId })
    .then(() => res.json("Flight deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;