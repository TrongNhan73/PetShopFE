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
        return {}
    } catch (e) {
        console.log('>>>err when get data from localStorage:');
        console.log(e);
        return {}
    }
}

export { getData, saveData }