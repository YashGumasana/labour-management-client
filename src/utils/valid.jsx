export const valid = ({ userName, fullName, email, phoneNumber, password, confirmPassword, category }) => {
    let err = ''
    if (!userName) {
        err = "Please add your user name."
    } else if (userName.replace(/ /g, '').length > 25) {
        err = "User name is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }
    if (!fullName) {
        err = "Please add your full name."

    } else if (fullName.length > 25) {
        err = "Full name is up to 25 characters long."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }



    if (!email) {
        err = "Please add your email."
    } else if (!validateEmail(email)) {
        err = "Email format is incorrect."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!phoneNumber) {
        err = "Please add your phoneNumber."
    } else if (phoneNumber.length !== 10) {
        err = "phoneNumber must be at least 10 characters."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!(category === 0 || category === 1 || category === 2 || category === 3)) {
        err = "Invalid category."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (!password) {
        err = "Please add your password."
    } else if (password.length < 6) {
        err = "Password must be at least 6 characters."
    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }

    if (password !== confirmPassword) {
        err = "Password and Confirm password did not match."
    }
    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }


}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


export const validJobDetail = ({ jobTitle,
    description,
    experinceLevel,
    location,
    salery,
    timeDuration }) => {
    let err = ''

    if (!jobTitle) {
        err = "Please add jobTitle."

    }
    if (!description) {
        err = "Please add description"

    }
    if (!experinceLevel) {
        err = "Please add your user name."

    }
    if (!location) {
        err = "Please add location."

    }
    if (!salery) {
        err = "Please add salery."

    }
    if (!timeDuration) {
        err = "Please add timeDuration."

    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }
}


export const validFeedBackDetail = ({ userId, tenure, remark }) => {
    let err = ''

    if (!userId) {
        err = "Please add userId."

    }
    if (!tenure) {
        err = "Please add tenure"

    }
    if (!remark) {
        err = "Please add remark"

    }

    if (err) {
        return {
            errMsg: err,
            errLength: 1
        }
    }
}

