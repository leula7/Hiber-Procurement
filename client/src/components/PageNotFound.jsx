import React from "react";


const PageNotFound = ()=>{
    return(
        <>
            <div className="page-not-found">
                <h1>Error 404</h1>
                <div className="error-message">
                    <p className="opps">Opps! </p>
                    <p> Page not found</p>
                </div>
                <p>The Page you're looking for doesn't exist</p>
                <button>Go Home</button>
            </div>

        </>
    )
}

export default PageNotFound;