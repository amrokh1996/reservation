import { gapi } from 'gapi-script'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSocialFacebook } from 'reactjs-social-login'
import dotenv from 'react-dotenv';
import '../styles/social.css'

export default function SigInWithFacebook({ massage, path, updateIsLog }) {

    const navigate = useNavigate();
    const [massageWarning, setMassageWarning] = useState('');

    const themeValue = {
        success: "green",
        error: "red",
        warning: "red",
        normal: "teal"
    }

    function checkSignIn(email, name) {

        for (let index = 0; index < users.length; index++) {
            if (email === users[index].email && name === users[index].name) {
                return users[index];
            }
        }
        return false;
    }

    function handleSignIn(response) {

        const email = response.data.email;
        const name = response.data.name;
        console.log(response.data)
        // const isUser = checkSignIn(email, name)
        // if (isUser) {
        //     // sessionStorage.setItem('User', JSON.stringify(isUser));
        //     // console.log(isUser)
        // }
        // else {
        //     const user = {
        //         name: name,
        //         email: email,
        //         cart: []
        //     };
        //     setUsers([...users, user]);
        //     sessionStorage.setItem('User', JSON.stringify(user));
        //     localStorage.setItem('Users', JSON.stringify([...users, user]));
        // }
        // updateIsLog(true);
        // navigate(path);
    }

    function handleError(error) {
        setMassageWarning("Something went wrong, please try again later");
        console.log("Sign With Facebook, Error  :" + error);
    }

    return (
        <>
            <LoginSocialFacebook
                appId={814439923353822}
                onResolve={handleSignIn}
                onReject={handleError}>

                <button id="customBtnFac" class="sign-with-account custom-button">
                    <div class="p-1">
                        <svg class="custom-svg me-1" xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024" id="facebook-logo-2019"><path fill="#1877f2" d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"></path><path fill="#fff" d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"></path></svg>
                    </div>
                    
                    <span class="custom-text">
                        <div></div>
                        {massage}
                    </span>
                </button>
                <p class="custom-warning">
                    <span class="custom-font-medium">{massageWarning}</span>
                </p>
            </LoginSocialFacebook>
        </>
    )
}