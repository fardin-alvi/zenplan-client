import navImage from '../assets/na.png';
import backgroundImage from '../assets/banner.jpg';
import Lottie from "lottie-react";
import animate from '../assets/Todo.json';
import { useContext, useState } from 'react';
import { Authcontext } from '../provider/AuthProvider';
import axios from 'axios';
import Task from './Task';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import toast from 'react-hot-toast';

const Home = () => {
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { singinWithGoogle, setUser, user, logout } = useContext(Authcontext);

    const handleGoogle = () => {
        singinWithGoogle()
            .then(res => {
                toast.success('Logged in successfully!');
                setUser(res.user);
                setIsLoggedIn(true);

                const userData = {
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                    uid: res.user.uid
                };

                axios.post('http://localhost:5000/users', userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => {
                        console.log('Success:', res.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(err => setError(err.message));
    };

    const handleLogout = () => {
        logout() 
            .then(() => {
                setUser(null); 
                setIsLoggedIn(false);
                setError('');
            })
            .catch(err => {
                setError(err.message);
            });
    };

    return (
        <div
            className={`bg-cover bg-center relative min-h-screen ${!isLoggedIn && !user ? 'h-screen' : ''}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <nav className="relative flex justify-between items-center p-4">
                <img src={navImage} alt="Logo" className="w-48 h-16 text-black" />
                {isLoggedIn || user ? (
                    <div className="text-white flex items-center space-x-4">
                        <span>{user?.displayName}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-600 px-4 py-1 text-white rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                ) : null}
            </nav>

            <div className="relative flex flex-col items-center justify-center text-white">
                {isLoggedIn || user ? (
                    <DndProvider backend={HTML5Backend}>
                        <Task />
                    </DndProvider>
                ) : (
                    <>
                        <div>
                            <Lottie animationData={animate} loop={true} className='w-60' />
                        </div>
                        <button onClick={handleGoogle} className='bg-blue-900 font-medium rounded-lg p-4'>
                            SignUp / Login with Google
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;