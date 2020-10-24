
function RoleCollection(app) {

    const db = require("../mongodb");
    const dbName = "TPConnectsDB";
    const rolesCollection = "role";

    db.initialize(dbName, rolesCollection, function (dbCollection) { // successCallback
        // get all items
        // dbCollection.find().toArray(function(err, result) {
        //     if (err) throw err;
        //       console.log(result);

        // });

        // << db CRUD routes >>
        app.get('/roles', (req, res) => {
            dbCollection.find().toArray(function (err, result) {
                if (err) throw err;
                {
                    res.json(result);
                    console.log(result);
                }
            });
        });

        app.get('/roles/:id', (req, res) => {
            const roleId = req.params.id;
            dbCollection.findOne({ roleId: roleId }, (err, result) => {
                if (err) throw error;
                else {
                    res.json(result);
                    console.log(result);
                }
            });
        });

        app.post('/roles/add', (req, res) => {
            dbCollection.insert(req.body, (err) => {
                if (err) throw err;
                res.send("Role saved successfully");
            });
        });

        app.put('/roles/update/:id', (req, res) => {
            const roleId = req.params.id;
            const role = req.body;

            dbCollection.updateOne({ roleId: roleId }, { $set: role }, (err, result) => {
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


        app.delete('roles/delete/:id', (request, response) => {
            const _Id = request.params.id;
            console.log("Delete item with id: ", _Id);

            dbCollection.deleteOne({ roleId: _Id }, function (error) {
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
    RoleCollection
};