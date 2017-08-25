const ATTOKEN = "ATToken";

let getExpirationDate = (rememberUser) => {
    if (rememberUser) {
        let endDate = new Date();
        return endDate.setDate(endDate.getDate() + 90);
    }
    return null;
}

let getDomain = () => {
    let splittedHost = top.location.host.split(".");
    let domain = "";
    if (splittedHost.length > 2 &&
        isNaN(parseInt(splittedHost[splittedHost.length - 1].split(':')[0]))) { // if last item (omiting ':' for port) is not a number for ip adresses
        domain = "." + splittedHost[splittedHost.length - 2] + "." + splittedHost[splittedHost.length - 1];
    }
    return domain;
}

let forgeCookie = (key, val, options) => key && val ? `${key}=${val};${Object.entries(options).reduce((acc, cur) => acc+=`${cur[0]}=${cur[1]};`, '')}` : null

class AuthSvc {    
    constructor(config){
        this.config = config
        this.profile = null
    }

    authenticateUser(credential){
        return fetch(this.config.satelliteUrl + "/authentication/authentication?include={scope}", { 
            method: 'GET',
            headers: new Headers({
                "Authorization": "Basic " + btoa(credential.email + ":" + credential.password),
                "Accept": "application/json",
                "AT-APP": this.config["AT-APP"]
            }),
            mode: 'cors'
        }).then((response) => {
            if(response.ok) {
                return this.profile = response.json()
            }
            throw new Error('Not authentified');
        })
    }

    isAuthed(){
        return this.profile || document.cookie.includes(ATTOKEN)
    }

    setCookie(token, rememberUser){
        let href = window.location.href;
        let local = href.indexOf("localhost") >= 0;
        let cookieValue = "Token=" + token;
        //On force l'interne en local
        if (local) {
            cookieValue += "&internal=1";
        }
        document.cookie = forgeCookie(ATTOKEN, cookieValue, {
            expires: getExpirationDate(rememberUser),
            path: "/",
            domain: getDomain()
        });
    }
}

export let authSvc = new AuthSvc({
    satelliteUrl: "https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_bdev",
    'AT-APP': 22
})
