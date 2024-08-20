// class ExpressError  extends  Error{
//     constructor (message,statusCode){
//         super();
//         this.message=message;
//         this.statusCode = statusCode;

//     }
// }



class ExpressError extends Error {
    constructor(message, statusCode = 500) {
        super(message);  // Pass the message to the parent class (Error)
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;



// module.exports = ExpressError;