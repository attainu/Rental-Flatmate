var mongoose = require("mongoose");
var {
    MongoMemoryServer
} = require("mongodb-memory-server")
const mongod = new MongoMemoryServer()

function mongoDb(usingDB) {
    return mongoose.connect(usingDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connect: function () {
        return new Promise(function (resolve, reject) {
            if (process.env.NODE_ENV === "test") {
                mongod.getUri().then(function (res) {
                    mongoDb(res).then(function () {
                        resolve("testing mongoose DB conncted")
                    }).catch(function () {
                        reject()
                    })
                })
            } else {
                mongoose
                    .connect(
                        "mongodb://localhost:27017/test", {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        }
                    ).then(function () {
                        console.log("Mongo db compass connected")
                        resolve("Mongo db compass connected")
                    }).catch(function () {
                        reject()
                    })
            }

        })
    },
    disconnect: function () {
        mongoose.disconnect()
    }
}