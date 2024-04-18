import axios from "axios";

// const API_SERVICE = 'http://localhost:3000'
const API_SERVICE = 'http://192.168.1.49:3000'

export const User = async () => {

    return await axios.get(`${API_SERVICE}/User`).then((res) => {
        console.log("return from api", res);
        return res
    });
}
export const SelectUser = async (row_id) => {

    return await axios.post(`${API_SERVICE}/selectUser`,
{
    row_id:row_id

}).then((res) => {
        console.log("return from api", res);
        return res
    });
}


export const Newuser = async (
    firstName,
    lastname,
    nickname,
    birthday,
    age,
    sex
  
) => {
    return await axios.post(`${API_SERVICE}/newuser`,
        {
            firstName: firstName,
            lastname: lastname,
            nickname: nickname,
            birthday: birthday,
            age: age,
            sex: sex

        }).then((res) => {
            console.log("return from api", res);
            return res
        });
}

export const Updateuser = async (
    row_id,
    updatefirstName,
    updatelastname,
    updatenickname,
    updatebirthday,
    updateage,
    updatesex
  
) => {
    return await axios.post(`${API_SERVICE}/updateuser`,
        {
            row_id: row_id,
            updatefirstName: updatefirstName,
            updatelastname: updatelastname,
            updatenickname:updatenickname,
            updatebirthday: updatebirthday,
            updateage: updateage,
            updatesex: updatesex

        }).then((res) => {
            console.log("return from api", res);
            return res
        });
}


export const DeleteUser = async (row_id) => {
    return await axios.post(`${API_SERVICE}/deleteuser`,
    {
        row_id: row_id,

    }
).then((res) => {
            console.log("return from api", res);
            return res
        });
}