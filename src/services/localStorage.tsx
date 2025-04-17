const saveData = (key: string, data: string) => {
    try {
        localStorage.setItem(key, data);
    } catch (e) {
        console.log('>>>err when save in localStorage:');
        console.log(e);
    }
}

const getData = (key: string) => {
    try {
        let jsondata = localStorage.getItem(key);
        if (jsondata) {
            return JSON.parse(jsondata);
        }
        return null
    } catch (e) {
        console.log('>>>err when get data from localStorage:');
        console.log(e);
        return null
    }
}

const deleteData = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log('>>>err when delete data from localStorage:');
        console.log(e);
    }
}

export { getData, saveData, deleteData }