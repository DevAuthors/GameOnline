require("dotenv").config({path: 'variables.env'})

const User = require('./model');

function Error(name, error){
    console.error(`Error in User.Controller["${name}"]: ${error}`);
    return {
        error
    }
}

// Export Schema
exports.schema = User;

// Get methods
    exports.getAll = async () => {
        try {
            const values = await User.find();
            return {
                data: values
            }
        } catch (error) {
            return Error('getAll', error);    
        }
    }

    exports.get = async (Id) => {
        try {
            return {
                data: await User.findById(Id)
            }
        } catch (error) {
            return Error('get', error);    
        }
    }

    exports.getBy = async (query) => {
        try {
            return {
                data: await User.find(query)
            };
        } catch (error) {
            return Error('getBy', error);
        }
    }

// Add methods
    exports.add = async (Data) => {
        const user = new User({
            Username: Data.Username,
            Password: Data.Password,
            Email: Data.Email,
            SocketId: Data.SocketId,
            ID: Data.ID,
            Extra: Data.Extra
        });
        try {
            await user.save();
            return user;
        } catch (error) {
            return Error('add', error);
        }
    }

// Remove methods
    exports.remove = async (Id) => {
        typeof Id === "string";
        try {
            await User.findByIdAndRemove(Id);
            return true;
        } catch (error) {
            return Error('remove', error);
        }
    }
    exports.removeBy = async (query) => {
        try {
            await User.findOneAndRemove(query);
            return true;
        } catch (error) {
            return Error("removeBy", error);
        }
    }
    exports.removeAll = async (Pass) => {
        if(Pass === process.env.PASS){
            try {
                const All = await User.find();
                if(All.length !== 0){
                    for(let a of All){
                        await User.findByIdAndRemove(a._id);
                    }
                }
                return true;
            } catch (error) {
                return Error("removeAll", error);
            }
        }else{
            return Error("removeAll", {message: "password incorrect"});
        }
    }

// Update methods
    exports.update = async (Id, Data) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(Id, Data);
            return {
                data: updatedUser
            };
        } catch (error) {
            Error('update', error);
        }
    }

module.exports = exports;