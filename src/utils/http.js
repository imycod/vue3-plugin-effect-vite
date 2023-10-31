function Http() {

}
Http.prototype.request = function (options) {
    return new Promise((resolve, reject) => {
        const config = {}
        config.headers = options.headers || {}
        // config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = options.Authorization
        config.method = options.method
        config.responseType = options.responseType || 'json'
        fetch('/gok' + options.url, config)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
const http = new Http()

export default http