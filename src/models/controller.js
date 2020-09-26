const User = require('./User/controller');

//#region --- Add methods
exports.add = {}
    exports.add.user = async Data => {
        await User.add(Data);
        return true;
    }
//#endregion

//#region --- Get methods
exports.get = {};
    exports.get.user = async Data => {
        switch (Data.type) {
            case "All":
                return await User.getAll();
            break;
            case "id":
                return await User.get(Data.value);
            break;
            case "By":
                return await User.getBy(Data.value);
            break;
        }
    }
//#endregion

//#region --- Remove methods
exports.rmv = {};
    exports.rmv.user = async Data => {
        try {
            switch (Data.type) {
                case "id":
                    await User.remove(Data.value);
                break;
                case "By":
                    await User.removeBy(Data.value);
                break;
                case "All":
                    await User.removeAll(Data.value);
                break;
            }
            return true;
        } catch (error) {
            return error;
        }
    }
//#endregion

//#region --- Counter methods
exports.count = {};
    exports.count.user = async () => {
        try {
            const All = (await User.getAll()).data;
            return All.length;
        }catch(error){
            return error;
        }
    }
//#endregion

module.exports = exports;