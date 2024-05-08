import './ArtistBooking.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ArtistBooking = ({ artistId }) => {
    const [selectedArtist, setSelectedArtist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_URL = "http://localhost:8080/"
    //const API_URL = process.env.REACT_APP_API_URL

    useEffect(() => {
        const getTheArtist = async () => {
            try {
                const response = await axios.get(`${API_URL}${artistId}`)
                setSelectedArtist(response.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        getTheArtist()
    }, [artistId, API_URL])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <section className='profile'>
            <img alt='artist performing' className='profile__image'/>
            <div className='profile__container'>
                <h2 className='profile__name'>{selectedArtist.name}</h2>
                <p className='profile__description'>{selectedArtist.description}</p>
            </div>
            <div className='profile__contact'>
                <p className='profile__email'>{selectedArtist.email}</p>
            </div>
        </section>
    )
}

export default ArtistBooking
