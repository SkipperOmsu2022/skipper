const signIn =  (values) => {
    console.log(JSON.stringify(values, null, 2))
    localStorage.removeItem('logged');
    localStorage.setItem('logged', true);
}

const signUp =  (values) => {
    console.log(JSON.stringify(values, null, 2))
    localStorage.removeItem('logged');
    localStorage.setItem('logged', true);
}

const logOut = () => {
    console.log('logged out')
    localStorage.removeItem('logged');
}

export {signIn, signUp, logOut};