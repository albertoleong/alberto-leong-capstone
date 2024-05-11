import './Profile.scss'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import artist from '../../assets/images/nate.jpeg'
import EditProfile from '../../components/EditProfile/EditProfile';

const Profile = () => {
    const { isLoggedIn } = useAuth()
    const [userData, setUserData] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem('token'); 
            const response = await axios.get('http://localhost:8080/account', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn]);


    const handleEditProfile = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleProfileUpdate = async (updatedData) => {
        
        try {
            const token = sessionStorage.getItem('token');
            await axios.patch('http://localhost:8080/account', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchUserData();
            setShowModal(false); 
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <main className='account'>
            {userData ? (
                <h1 className='account__title'>Welcome back {userData.name}!</h1>
            ) : (
                <h1>Loading...</h1>
            )}
            <section className='account__section'>
                <img src={artist} className='account__image' alt='artist profile'/>
                {userData && (
                <div className='account__container'>
                    <h2 className='account__heading'>Profile info:</h2>
                    <div>
                        <label>Artist type:</label>
                        <p className='account__info'>{userData.type}</p>
                    </div>
                    <div>
                        <label>Location:</label>
                        <p className='account__info'>{userData.location}</p>
                    </div>
                    <div>
                        <label>Genres:</label>
                        <p className='account__info'>{userData.music_styles}</p>
                    </div>
                    <div className='account__hidden'>
                        <label>Description:</label>
                        <p className='account__info'>{userData.description}</p>
                    </div>
                    <button onClick={handleEditProfile} 
                        className='account__button account__button--hidden'>
                            Edit Profile
                    </button>
                </div>
                )}
            </section>
            {userData && (
                <div className='account__container2'>
                    <label>Description:</label>
                    <p className='account__info'>{userData.description}</p>
                </div>
            )}
            <button onClick={handleEditProfile} className='account__button'>Edit Profile</button>
            {showModal && (
                <EditProfile
                    artist={userData}
                    onClose={handleCloseModal}
                    onUpdate={handleProfileUpdate}
                />
            )}
        </main>
    )
}

export default Profile;
