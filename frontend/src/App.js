import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Basic CSS for styling

// Hardcoded trek data (simulating a database for simplicity)
// In a real application, this data would come from the backend API.
const treks_data = [
    {"id": 1, "name": "Harishchandragad Trek", "location": "Ahmednagar, Maharashtra", "difficulty": "Medium", "duration": "2 Days", "price": 1800, "description": "Harishchandragad is a hill fort in the Ahmednagar district of India. Its history is linked with that of Malshej Ghat, Kothale village and Khireshwar village. This trek is famous for its Konkan Kada (Konkan cliff) and the Kedareshwar Cave with its Shiva Lingam. It offers a challenging yet rewarding experience with breathtaking views, ancient temples, and diverse flora and fauna. Best time to visit is post-monsoon or winter.", "image": "https://placehold.co/400x200/007bff/ffffff?text=Harishchandragad"},
    {"id": 2, "name": "Kalsubai Peak Trek", "location": "Ahmednagar, Maharashtra", "difficulty": "Hard", "duration": "1 Day", "price": 1500, "description": "Kalsubai is the highest peak of the Sahyadri mountain range in Maharashtra, India. The summit is located at an elevation of 1,646 meters (5,400 ft) above sea level. This trek is known for its challenging ascent, but the panoramic views from the top, especially during sunrise or sunset, are absolutely worth it. There's a small temple at the summit. Ideal for experienced trekkers looking for a thrilling climb.", "image": "https://placehold.co/400x200/28a745/ffffff?text=Kalsubai"},
    {"id": 3, "name": "Lonavala & Khandala Waterfall Trek", "location": "Pune, Maharashtra", "difficulty": "Easy", "duration": "1 Day", "price": 800, "description": "A refreshing monsoon trek in the scenic Lonavala and Khandala region. This trek involves walking through lush green trails, crossing streams, and enjoying the numerous seasonal waterfalls that come alive during the rainy season. It's a perfect getaway for beginners and families, offering beautiful landscapes and a chance to connect with nature without extreme physical exertion. Popular spots include Bhushi Dam and Duke's Nose.", "image": "https://placehold.co/400x200/ffc107/000000?text=Lonavala"},
    {"id": 4, "name": "Rajgad Fort Trek", "location": "Pune, Maharashtra", "difficulty": "Medium", "duration": "2 Days", "price": 2000, "description": "Rajgad (King of Forts) is a hill fort situated in the Pune district of Maharashtra, India. The fort was the capital of the Maratha Empire under the rule of Chhatrapati Shivaji Maharaj for almost 26 years, after which he moved the capital to Raigad Fort. This trek offers a rich historical experience combined with moderate difficulty. The fort's vastness and strategic design are impressive, with points like Balekilla, Suvela Machi, and Padmavati Machi offering great views and historical insights.", "image": "https://placehold.co/400x200/dc3545/ffffff?text=Rajgad"},
];

// BookingPage Component
function BookingPage({ trek, onBack, onBookingConfirmed }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [participants, setParticipants] = useState(1);
    const [bookingStatus, setBookingStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate booking submission
        setBookingStatus(`Processing booking for ${trek.name}...`);
        // In a real application, you would send this data to your backend API
        console.log('Booking submitted:', { trekId: trek.id, name, email, participants });

        // Simulate API call delay
        setTimeout(() => {
            const confirmationDetails = {
                trekName: trek.name,
                name: name,
                participants: participants,
                totalPrice: trek.price * participants,
                bookingId: Math.floor(Math.random() * 1000000) // Simple random ID
            };
            onBookingConfirmed(confirmationDetails);
        }, 1500); // Simulate 1.5 second delay for API call
    };

    return (
        <div className="container booking-page">
            <button className="back-button" onClick={onBack}>&larr; Back</button>
            <h2>Book: {trek.name}</h2>
            <p><strong>Location:</strong> {trek.location}</p>
            <p><strong>Price per person:</strong> ₹{trek.price}</p>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="participants">Number of Participants:</label>
                <input
                    type="number"
                    id="participants"
                    value={participants}
                    onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    required
                />
                
                <p className="text-lg font-bold mt-4 mb-6">Total Price: ₹{trek.price * participants}</p>

                <button type="submit" className="submit-button">Confirm Booking</button>
            </form>
            {bookingStatus && (
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 rounded-lg shadow">
                    {bookingStatus}
                </div>
            )}
        </div>
    );
}

// TrekDetailPage Component
function TrekDetailPage({ trek, onBack, onBookTrek }) {
    return (
        <div className="container trek-detail-page">
            <button className="back-button" onClick={onBack}>&larr; Back to Treks</button>
            <h2>{trek.name}</h2>
            <img src={trek.image} alt={trek.name} className="trek-image" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x300/cccccc/000000?text=Trek+Image"; }} />
            <p><strong>Location:</strong> {trek.location}</p>
            <p><strong>Difficulty:</strong> {trek.difficulty}</p>
            <p><strong>Duration:</strong> {trek.duration}</p>
            <p><strong>Price:</strong> ₹{trek.price} per person</p>
            <p className="mt-4">{trek.description}</p>
            <div className="detail-buttons">
                <button className="book-button" onClick={() => onBookTrek(trek)}>Book This Trek</button>
            </div>
        </div>
    );
}

// ConfirmationPage Component
function ConfirmationPage({ bookingDetails, onBackToHome }) {
    return (
        <div className="container confirmation-page">
            <h2>Booking Confirmed!</h2>
            <p className="text-green-600">Your booking for **{bookingDetails.trekName}** is successful!</p>
            <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
            <p><strong>Booked by:</strong> {bookingDetails.name}</p>
            <p><strong>Participants:</strong> {bookingDetails.participants}</p>
            <p><strong>Total Price:</strong> ₹{bookingDetails.totalPrice}</p>
            <p className="mt-4">Thank you for booking with us. We look forward to seeing you on the trek!</p>
            <button className="book-button" onClick={onBackToHome}>Back to Home</button>
        </div>
    );
}

// App Component (Main application logic)
function App() {
    const [treks, setTreks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [selectedTrek, setSelectedTrek] = useState(null); // To store the trek being booked or detailed
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'trek-detail', 'booking', 'confirmation'
    const [bookingDetails, setBookingDetails] = useState(null); // To store details for confirmation page

    // IMPORTANT: For local development with docker-compose, this might be 'http://localhost:5000'.
    // For cloud deployment, this will be your deployed backend URL.
    // This variable will be replaced during the frontend Docker build process via ARG/ENV.
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; 

    useEffect(() => {
        const fetchTreks = async () => {
            try {
                setLoading(true);
                // In a real scenario, you'd use axios.get(`${API_URL}/treks`);
                // For this downloadable code, we'll fetch from the backend API_URL
                // If running the single HTML preview, this fetch will fail, and the error will be shown.
                const response = await axios.get(`${API_URL}/treks`);
                setTreks(response.data);
            } catch (err) {
                setError(`Failed to fetch treks from ${API_URL}. Please ensure the backend is running and accessible.`);
                console.error("Error fetching treks:", err);
                // Fallback to hardcoded data for local dev if backend isn't running
                setTreks(treks_data); 
            } finally {
                setLoading(false);
            }
        };
        fetchTreks();
    }, [API_URL]);

    const handleViewDetailsClick = (trek) => {
        setSelectedTrek(trek);
        setCurrentPage('trek-detail');
    };

    const handleBookNowClickFromList = (trek) => {
        setSelectedTrek(trek);
        setModalMessage(`You are about to book the ${trek.name}. Do you want to proceed to the booking page?`);
        setShowModal(true);
    };

    const handleBookTrekFromDetail = (trek) => {
        setSelectedTrek(trek); // Ensure trek is set if coming from detail page
        setCurrentPage('booking');
    };

    const handleContinueBooking = () => {
        setShowModal(false);
        setCurrentPage('booking');
    };

    const handleBookingConfirmed = (details) => {
        setBookingDetails(details);
        setCurrentPage('confirmation');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setSelectedTrek(null);
        setBookingDetails(null);
    };

    const handleBackFromBooking = () => {
        // If coming from trek detail, go back to detail. Else, go home.
        if (currentPage === 'booking' && selectedTrek) {
            setCurrentPage('trek-detail');
        } else {
            setCurrentPage('home');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
    };

    // Function to determine the title for the header
    const getPageTitle = () => {
        switch (currentPage) {
            case 'home':
                return 'Trek Listing';
            case 'trek-detail':
                return selectedTrek ? `Details: ${selectedTrek.name}` : 'Trek Details';
            case 'booking':
                return selectedTrek ? `Book: ${selectedTrek.name}` : 'Book Trek';
            case 'confirmation':
                return 'Booking Confirmation';
            default:
                return 'Trek Booking App';
        }
    };

    if (loading) return <div className="container">Loading treks...</div>;
    // Removed error check here to allow fallback to hardcoded data
    // if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>{getPageTitle()}</h1>
            </header>
            <main className="container">
                {currentPage === 'home' && (
                    <>
                        <div className="welcome-message">
                            Welcome to the Trek Booking Application!
                        </div>
                        <h2>Available Treks in Maharashtra</h2>
                        <div className="trek-list">
                            {treks.map(trek => (
                                <div key={trek.id} className="trek-card">
                                    <img src={trek.image} alt={trek.name} className="trek-image" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x200/cccccc/000000?text=Trek+Image"; }} />
                                    <h3>{trek.name}</h3>
                                    <p><strong>Location:</strong> {trek.location}</p>
                                    <p><strong>Difficulty:</strong> {trek.difficulty}</p>
                                    <p><strong>Duration:</strong> {trek.duration}</p>
                                    <p><strong>Price:</strong> ₹{trek.price}</p>
                                    <p>{trek.description.substring(0, 100)}...</p> {/* Show snippet */}
                                    <div className="trek-card-buttons">
                                        <button className="view-details-button" onClick={() => handleViewDetailsClick(trek)}>View Details</button>
                                        <button className="book-button" onClick={() => handleBookNowClickFromList(trek)}>Book Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {currentPage === 'trek-detail' && selectedTrek && (
                    <TrekDetailPage trek={selectedTrek} onBack={handleBackToHome} onBookTrek={handleBookTrekFromDetail} />
                )}

                {currentPage === 'booking' && selectedTrek && (
                    <BookingPage trek={selectedTrek} onBack={handleBackFromBooking} onBookingConfirmed={handleBookingConfirmed} />
                )}

                {currentPage === 'confirmation' && bookingDetails && (
                    <ConfirmationPage bookingDetails={bookingDetails} onBackToHome={handleBackToHome} />
                )}
            </main>
            <footer>
                <p>&copy; 2025 TrekBooking App. For DevOps Practice.</p>
            </footer>

            {/* Custom Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={closeModal}>&times;</button>
                        <p>{modalMessage}</p>
                        <div className="modal-buttons">
                            <button className="book-button modal-button" onClick={closeModal}>Cancel</button>
                            <button className="book-button modal-button" onClick={handleContinueBooking}>Continue to Booking</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Use React 18's createRoot API for rendering
const root = window.ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
