class RequestService {

    async postLogin(url, object){
        let data = await fetch(url, {
            method: 'post',
            body: JSON.stringify(object),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
            }
        })
        .then()
    }
}