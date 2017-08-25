const ATTOKEN = "ATToken";

/* 
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
 */

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

    fetchProfile(){
        let tok = localStorage.getItem(ATTOKEN);
        if(!tok) throw new Error('No saved token')
        return fetch("http://sat-dtc-omega-bod.intraxiti.com/rest/config/v1_omega/users/profile?include={betamode}", { 
            method: 'GET',
            headers: new Headers({
                "Authorization": tok,
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
        return this.profile || localStorage.getItem(ATTOKEN)
    }

    saveToken(token){
        localStorage.setItem(ATTOKEN, `Token ${token}`)
    }
}

export let authSvc = new AuthSvc({
    satelliteUrl: "https://sat-dtc-dev-bod.atinternet-solutions.com/rest/config/v1_bdev",
    'AT-APP': 22
})
