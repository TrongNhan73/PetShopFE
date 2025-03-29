const saveData = (key: string, data: string) => {
    try {
        sessionStorage.setItem(key, data);
    } catch (e) {
        console.log('>>>err when save in sessionStorage:');
        console.log(e);
    }
}

const getData = (key: string) => {
    try {
        let jsondata = sessionStorage.getItem(key);
        if (jsondata) {
            return JSON.parse(jsondata);
        }
        return {}
    } catch (e) {
        console.log('>>>err when get data from sessionStorage:');
        console.log(e);
        return {}
    }
}


const deleteData = (key: string) => {
    try {
        sessionStorage.removeItem(key);
    } catch (e) {
        console.log('>>>err when delete data from sessionstorage:');
        console.log(e);
    }
}

export { getData, saveData, deleteData }