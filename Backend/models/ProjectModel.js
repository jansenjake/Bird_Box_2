//  DATABASE CONFIG //
const db = require('../config/index.js');

//  BCRYPT MODULE //
const {
    hash,
    compare,
    hashSync
} = require('bcrypt');

// MIDDLEWARE FOR CREATING TOKEN //
const {createToken} = require ('../middleware/AuthenticatedUser');

// USER //

class User {
    login (req, res) {
        const {
            emailAdd, 
            userPwd
        } = req.body;
        const strQry = 
        `
        SELECT firstName, lastName, gender, emailAdd, 
        userPwd, userRole, userProfile
        FROM Users
        WHERE emailAdd = '${emailAdd}';
        `;
        db.query(strQry, async (err, data) => {
            if (err) throw err;
            if ((data.length) || (data == null)) {
                res.status(401).json({ err: 
                  "You have privided a wrong email address."})
            } else {
                await compare(userPwd,
                    data[0].userPwd,
                    (cErr, cResult)=> {
                        if (cErr) throw cErr;
                        //  create a token
                        const jwToken =
                        createToken(
                            {
                                emailAdd, userPwd
                            }
                        );
                        // SAVING
                        res.cookie('LegitUser',
                        jwToken, {
                            maxAge: 3600000,
                            httpOnly: true
                        })
                        if(cResult) {
                            res.status(200).json({
                                msg: 'Logged in!',
                                jwToken,
                                result: data[0]
                            })
                        } else {
                            res.status(401).json({
                                err: 'You have entered an invalid password or did not register.'
                            })
                        }
                    })
            }
        })
    }
    fetchUsers(req, res) {
        const strQry = 
        `
        SELECT userID, firstName, lastName, gender,
        cellPhoneNumber, emailAdd, usrRole, userProfile, joinDate
        FROM Users;
        `;
        // database
        db.query(strQry, (err, data)=> {
            if (err) throw err;
            else res.status(200).json(
                {results:data} );
        })
    }
    fetchUsers(req, res) {
        const strQry =
        `
        SELECT userID, firstName, lastName, gender, cellPhoneNumber,
        emailAdd, userRole, userProfile, joinDate
        FROM Users
        WHERE userID = ?;
        `;
        // db
        db.query(strQry, [req.params.id],
            (err, data)=> {
             if (err) throw err;
             else res.status(200).json (
                {results: data} );
            })
    }
    async createUser(req, res) {
        //  payload --> info user inserts
        let detail = req.body;
        //  HASHING USER PASSWORD
      detail.userPwd = await
      hash(detail.userPwd, 15);
    //   authentication info
    let user = {
        emailAdd: detail.emailAdd,
        userPwd: detail.userPwd
    }
    //  SQL QUERY //
    const strQry =
    `
    INSERT INTO Users
    SET ?;
    `;
    db.query(strQry, [detail], (err)=> {
        if (err) {
            res.status(401).json({err});
        } else {
            // CREATE TOKEN
            const jwToken = createToken(user);
            // token saved in cookie
            // duration in milliseconds
            res.cookie("LegitUser", jwToken, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.status(200).json({msg: "A user record was saved."})
        }
    })
    }
    updateUser(req, res) {
        let data = req.body;
        if (data.userPwd !== null ||
            data.userPwd !== undefined)
            data.userPwd = hashSync(data.userPwd, 15);
        const strQry = 
        `
        UPDATE Users 
        SET ?
        WHERE userID = ?;
        `;
        //  database
        db.query(strQry, [data, req.params.id],
            (err)=> {
                if (err) throw err;
                res.status(200).json( {
                    msg: "A row was affected"
                } );
            })
        }
        deleteUser(req, res) {
            const strQry =
            `
            DELETE FROM Users
            WHERE userID = ?;
            `;
            // DATABASE //
            db.query(strQry, [req.params.id],
                (err) => {
                    if (err) throw err;
                    res.status(200).json( {msg:
                    "A record was removed from a database."
                    } )
                });
        }
}

// PRODUCT //
class Product {
    // GET ALL PRODUCTS //
    fetchProducts(req, res) {
        const strQry = `
        SELECT 
        id, prodName, prodDescription, 
        category, price, prodQuantity, imgURL
        FROM Products;`;
        db.query(strQry, (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
    }
    //  GET A SINGLE PRODUCT //
    fetchProduct(req, res) {
        const strQry = 
        `SELECT 
        id, prodName, prodDescription, 
        category, price, prodQuantity, imgURL
        FROM Products
        WHERE id = ?;
        `;
        db.query(strQry, [req.params.id], (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });

    }
    // CREATE A PRODUCT //
    addProduct(req, res) {
        const strQry = 
        `
        INSERT INTO Products
        SET ?;
        `;
        db.query(strQry,[req.body],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Unable to insert a new record."});
                }else {
                    res.status(200).json({msg: "A product was saved"});
                }
            }
        );    

    }
    //  UPDATE A PRODUCT //
    updateProduct(req, res) {
        const strQry = 
        `
        UPDATE Products
        SET ?
        WHERE id = ?
        `;
        db.query(strQry,[req.body, req.params.id],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Unable to update a record."});
                }else {
                    res.status(200).json({msg: "A product was updated"});
                }
            }
        );    

    }

    // DELETE A PRODUCT //  
    deleteProduct(req, res) {
        const strQry = 
        `
        DELETE FROM Products
        WHERE id = ?;
        `;
        db.query(strQry,[req.params.id], (err)=> {
            if(err) res.status(400).json({err: "The record was not found."});
            res.status(200).json({msg: "A product was deleted."});
        })
    }

}

// EXPORT USER AND PRODUCTS CLASS //
module.exports = {
    User, 
    Product
}