function ApiError(status = 500 ,code = 'server_error', message = undefined) {
    this.status = status;
    this.code = code;
    this.message = message;
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

ApiError.prototype.toJSON = function(){
    return {
        code: this.code,
        description: this.message
    }
};

export default ApiError;