const db = require('../config');

const {hash, compare, hashSync} = require('bcrypt');

const {createToken} = require('../middleware/authenticatedUser.js');

class User{
    login(req, res) {
        const {emailAdd, userPass} = req.body;
        const Query = `select userID, firstName, lastName, gender, cellPhoneNumber, emailAdd, userPass, userRole, userProfile, joinDate from Users where emailAdd = '${emailAdd}';`;

        db.query(Query, async (err, data) => {
            const userLog = data
            if(err) throw err, console.log(err);
            if((!data) || (data == null)) {
                res.status(401).json({err: 'You entered the wrong email address'})
            } else {
                await compare(userPass, data[0].userPass,(cErr, cResult) => {
                    if(cErr) throw cErr, console.log(cErr);

                    const jwToken = createToken ({
                        emailAdd,
                        userPass
                    });
                    if(cResult) {
                        res.status(200).json({
                            msg: 'Logged In', jwToken, result: data
                        })
                    }else {
                        res.status(401).json({
                            err: 'You entered an invalid password or have not registered.'
                        });
                    };
                });
            };
        });
    };
fetchUsers(req, res) {
    const fetchAllUsersQuery = `select userID, firstName, lastName, gender, cellPhoneNumber, emailAdd, userPass, userRole, userProfile, joinDate from Users;`;

    db.query(fetchAllUsersQuery, (err, data) => {
        if(err) throw err, console.log(err);
        else res.status(200).json({results:data});
    });
};
fetchUser(req, res) {
    const fetchUserQuery = `select userID, firstName, lastName, gender, cellPhoneNumber, emailAdd, userPass, userRole, userProfile, joinDate from Users where userID = ?;`;

    db.query(fetchUserQuery, [req.params.id], (err,data) => {
        if(err) throw err, console.log(err);
        else res.status(200).json({results:data});
    });
};
async createUser(req, res) {
    const detail = req.body;

    detail.userPass = await hash(detail.userPass, 15);

    const user = {
        emailAdd: detail.emailAdd,
        userPass: detail.userPass
    }

    const createQuery = `insert into Users set ?;`;

    db.query(createQuery, [detail], (err) => {
        if(err) {
            res.status(401).json({err});
        }else {
            const jwToken = createToken(user);

            res.cookie('Record Found', jwToken, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.status(200).json({msg: 'A user record was saved.'});
        };
    });
};
updateUser(req, res) {
    const data = req.body;
    if(data.userPass !== null || data.userPass !== undefined)
    data.userPass = hashSync(data.userPass, 15);

    const Query = `update Users set ? where userID = ?;`;

    db.query(Query, [data, req.params.id], (err) => {
        if(err) throw err, console.log(err);
        res.status(200).json({msg: 'A row was affected.'});
    });
};
deleteUser(req, res) {
    const Query = `delete from Users where userID = ?;`;

    db.query(Query, [req.params.id], (err) => {
        if(err) throw err, console.log(err);
        res.status(200).json({msg: 'A record was removed from a database'});
    });
};    
};


class Product {
    fetchProducts(req, res) {
        const fetchAllProducts = `select id, prodName, prodDescription, category, price, prodQuantity, imgURL from Products;`;

        db.query(fetchAllProducts, (err, results) => {
            if(err) throw err, console.log(err);
            res.status(200).json({results: results});
        });
    };
    fetchProduct(req, res) {
        const fetchProductQuery = `select id, prodName, prodDescription, category, price, prodQuantity, imgURL from Products where id = ?;`;

        db.query(fetchProductQuery, [req.params.id], (err, results) => {
            if(err) throw err, console.log(err);
            res.status(200).json({results: results});
        });
    };
    addProduct(req, res) {
        const Query = `insert into Products set ?;`;

        db.query(Query, [req.body], (err) => {
            if(err) {
                res.status(400).json({err: 'Unable to insert a new record.'});
            }else {
                res.status(200).json({msg: 'Product saved'});
            };
        });
    };
    updateProduct(req, res) {
        const Query = `update Products set ? where id = ?;`;

        db.query(Query, [req.body, req.params.id], (err) => {
            if(err) {
                console.log(err);
                res.status(400).json({err: 'Unable to update a record.'});
            } else {
                res.status(200).json({msg: 'Product updated'});
            };
        });
    }
    deleteProduct(req, res) {
        const Query = `delete from Products where id = ?;`;

        db.query(Query, [req.params.id], (err) => {
            if(err) res.status(400).json({err: 'The record was not found.'});
            res.status(200).json({msg: 'A product was deleted'});
        });
    };
};

module.exports = {User, Product};