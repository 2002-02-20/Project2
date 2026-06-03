const isAuthneticated = (req, res, next) => {
    if(req.session.user === undefined){
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized. Please log in to access this resource.'
        });
    }
    next();
}

module.exports = {
    isAuthneticated
}