import { react, use, useEffect , useContext} from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
const LoginPage = () => {

    const navigate=useNavigate()
    const {setIsAuthenticated,setUser,user,setUserId,userId} =useContext(AuthContext)


    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUp = () => container.classList.add('right-panel-active');
        const handleSignIn = () => container.classList.remove('right-panel-active');

        signUpButton?.addEventListener('click', handleSignUp);
        signInButton?.addEventListener('click', handleSignIn);

        // Cleanup function
        return () => {
            signUpButton?.removeEventListener('click', handleSignUp);
            signInButton?.removeEventListener('click', handleSignIn);
        };
    }, []);


    const handleSignup = async (event) => {
        event.preventDefault();
        try{
        let name = event.target.name.value;
        let email = event.target.email.value
        let password = event.target.password.value
        const response = await api.post('/auth/registerUser', { name, email, password })
        localStorage.setItem('token', response.data.token)
        setIsAuthenticated(true)
        setUser([name,email])
        navigate('/dashboard')

        }catch(err){
            console.log("error--->",err)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
        let email = event.target.email.value
        let password = event.target.password.value
        const response = await api.post('/auth/signIn',{email,password})
        localStorage.setItem('token',response.data.token)
        const tokenData = jwtDecode(response.data.token);
        setUserId(tokenData.id)
        setIsAuthenticated(true)
        setUser([response.data.user,email])
        console.log('----<',user)
        // setUser([name,email])
        navigate('/dashboard')

        }catch(err){
            console.log("error--->",err)
        }
    }

    return (
        <div className="loginContainer">
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <section>
                <div className="container" id="container">
                    <div className="form-container sign-up-container">
                        <form action="#" onSubmit={(e) => handleSignup(e)}>
                            <h1>Sign Up</h1>
                            <div className="social-container">
                                <a href="https://Github.com/YasinDehfuli" target="_blank" className="social"><i className="fab fa-github"></i></a>
                                <a href="https://Codepen.io/YasinDehfuli" target="_blank" className="social"><i className="fab fa-codepen"></i></a>
                                <a href="mailto:Ydehfuli@gmail.com" target="_blank" className="social"><i className="fab fa-google"></i></a>
                            </div>
                            <span>Or use your Email for registration</span>
                            <label>
                                <input name="name" type="text" placeholder="Name" />
                            </label>
                            <label>
                                <input name="email" type="email" placeholder="Email" />
                            </label>
                            <label>
                                <input name="password" type="password" placeholder="Password" />
                            </label>
                            <button style={{ marginTop: '9px' }}>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form action="#" onSubmit={(e) => handleLogin(e)}>
                            <h1>Sign in</h1>
                            <div className="social-container">
                                <a href="https://Github.com/YasinDehfuli" target="_blank" className="social"><i className="fab fa-github"></i></a>
                                <a href="https://Codepen.io/YasinDehfuli" target="_blank" className="social"><i className="fab fa-codepen"></i></a>
                                <a href="mailto:Ydehfuli@gmail.com" target="_blank" className="social"><i className="fab fa-google"></i></a>
                            </div>
                            <span> Or sign in using E-Mail Address</span>
                            <label>
                                <input name="email" type="email" placeholder="Email" />
                            </label>
                            <label>
                                <input name="password" type="password" placeholder="Password" />
                            </label>
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Log in</h1>
                                <p>Sign in here if you already have an account </p>
                                <button className="ghost mt-5" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Create, Account!</h1>
                                <p>Sign up if you still don't have an account ... </p>
                                <button className="ghost" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default LoginPage;