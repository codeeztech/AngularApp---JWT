
function UserCollection(app) {

    const db = require("../mongodb");
    const dbName = "TPConnectsDB";
    const UsersCollection = "User";
   

    db.initialize(dbName, UsersCollection, function (dbCollection) { // successCallback
        // get all items
        // dbCollection.find().toArray(function(err, result) {
        //     if (err) throw err;
        //       console.log(result);

        // });

        // << db CRUD routes >>
        app.get('/users', (req, res) => {
            dbCollection.find().toArray(function (err, result) {
                if (err) throw err;
                {
                    res.json(result);
                    console.log(result);
                }
            });
        });

        app.get('/uers/:id', (req, res) => {
            const UserId = req.params.id;
            dbCollection.findOne({ UserId: UserId }, (err, result) => {
                if (err) throw error;
                else {
                    res.json(result);
                    console.log(result);
                }
            });
        });

        app.post('/users/add', (req, res) => {
            dbCollection.insert(req.body, (err) => {
                if (err) throw err;
                res.send("User saved successfully");
            });
        });

        app.put('/users/update/:id', (req, res) => {
            const UserId = req.params.id;
            const User = req.body;

            dbCollection.updateOne({ UserId: UserId }, { $set: User }, (err, result) => {
                if (err) throw err;
                else {
                    console.log(result);
                    dbCollection.find().toArray(function (_err, _result) {
                        if (_err) throw _err;
                        {
                            res.json(_result);
                            console.log(_result);
                        }
                    });
                }
            });
        });


        app.delete('users/delete/:id', (request, response) => {
            const _Id = request.params.id;
            console.log("Delete item with id: ", _Id);

            dbCollection.deleteOne({ UserId: _Id }, function (error) {
                if (error) throw error;
                
                dbCollection.find().toArray(function (_error, _result) {
                    if (_error) throw _error;
                    response.json(_result);
                });
            });
        });



    }, function (err) { // failureCallback
        throw (err);
    });
}

module.exports = {
    UserCollection
};