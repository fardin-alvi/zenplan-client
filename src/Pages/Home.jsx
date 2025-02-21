import navImage from '../assets/na.png';
import backgroundImage from '../assets/banner.jpg';
import Lottie from "lottie-react";
import animate from '../assets/Todo.json'
import { useContext, useState } from 'react';
import { Authcontext } from '../provider/AuthProvider';
import axios from 'axios';


const Home = () => {
    const [error, seterror] = useState('');
    const { singinWithGoogle, setUser } = useContext(Authcontext);

    const handleGoogle = () => {
        singinWithGoogle()
            .then(res => {
                setUser(res.user);

                // Prepare user data
                const userData = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    uid: res.user.uid
                };

                // Send user data to the backend using axios
                axios.post('http://localhost:5000/user', userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        console.log('Success:', response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(err => seterror(err.message));
    };

    return (
        <div
            className="h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <nav className="relative flex justify-center ">
                <img src={navImage} alt="Logo" className="w-48 h-16 text-black" />
            </nav>
            <div className="relative flex flex-col items-center justify-center text-white">
                <div>
                    <Lottie animationData={animate} loop={true} className='w-60' />
                </div>
                <button onClick={handleGoogle} className='bg-blue-900 font-medium rounded-lg p-4'>
                    SignUp / Login with Google
                </button>
            </div>
        </div>
    );
};

export default Home;
