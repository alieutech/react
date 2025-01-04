const apiReguest = async (url = '', optionObj = null, errMsg = null) => {
    try {
        const res = await fetch(url, optionObj);
        if(!res.ok) throw new Error("Sorry something when wrong.");
        
    } catch (err) {
        errMsg = err.message;
    } finally {
       return errMsg;
    }
};

export default apiReguest;