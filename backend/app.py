from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# Enable CORS for frontend communication. In a production setup,
# you'd want to restrict this to your specific frontend domain.
CORS(app) 

# Hardcoded trek data (simulating a database for simplicity)
treks_data = [
    {"id": 1, "name": "Harishchandragad Trek", "location": "Ahmednagar, Maharashtra", "difficulty": "Medium", "duration": "2 Days", "price": 1800, "description": "Harishchandragad is a hill fort in the Ahmednagar district of India. Its history is linked with that of Malshej Ghat, Kothale village and Khireshwar village. This trek is famous for its Konkan Kada (Konkan cliff) and the Kedareshwar Cave with its Shiva Lingam. It offers a challenging yet rewarding experience with breathtaking views, ancient temples, and diverse flora and fauna. Best time to visit is post-monsoon or winter.", "image": "https://placehold.co/400x200/007bff/ffffff?text=Harishchandragad"},
    {"id": 2, "name": "Kalsubai Peak Trek", "location": "Ahmednagar, Maharashtra", "difficulty": "Hard", "duration": "1 Day", "price": 1500, "description": "Kalsubai is the highest peak of the Sahyadri mountain range in Maharashtra, India. The summit is located at an elevation of 1,646 meters (5,400 ft) above sea level. This trek is known for its challenging ascent, but the panoramic views from the top, especially during sunrise or sunset, are absolutely worth it. There's a small temple at the summit. Ideal for experienced trekkers looking for a thrilling climb.", "image": "https://placehold.co/400x200/28a745/ffffff?text=Kalsubai"},
    {"id": 3, "name": "Lonavala & Khandala Waterfall Trek", "location": "Pune, Maharashtra", "difficulty": "Easy", "duration": "1 Day", "price": 800, "description": "A refreshing monsoon trek in the scenic Lonavala and Khandala region. This trek involves walking through lush green trails, crossing streams, and enjoying the numerous seasonal waterfalls that come alive during the rainy season. It's a perfect getaway for beginners and families, offering beautiful landscapes and a chance to connect with nature without extreme physical exertion. Popular spots include Bhushi Dam and Duke's Nose.", "image": "https://placehold.co/400x200/ffc107/000000?text=Lonavala"},
    {"id": 4, "name": "Rajgad Fort Trek", "location": "Pune, Maharashtra", "difficulty": "Medium", "duration": "2 Days", "price": 2000, "description": "Rajgad (King of Forts) is a hill fort situated in the Pune district of Maharashtra, India. The fort was the capital of the Maratha Empire under the rule of Chhatrapati Shivaji Maharaj for almost 26 years, after which he moved the capital to Raigad Fort. This trek offers a rich historical experience combined with moderate difficulty. The fort's vastness and strategic design are impressive, with points like Balekilla, Suvela Machi, and Padmavati Machi offering great views and historical insights.", "image": "https://placehold.co/400x200/dc3545/ffffff?text=Rajgad"},
]

@app.route('/')
def health_check():
    """Simple health check endpoint."""
    return "Trek Booking Backend is running!"

@app.route('/treks', methods=['GET'])
def get_treks():
    """Returns the list of all treks."""
    return jsonify(treks_data)

@app.route('/treks/<int:trek_id>', methods=['GET'])
def get_trek(trek_id):
    """Returns a single trek by ID."""
    trek = next((t for t in treks_data if t["id"] == trek_id), None)
    if trek:
        return jsonify(trek)
    return jsonify({"message": "Trek not found"}), 404

if __name__ == '__main__':
    # Get port from environment variable, default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True) # debug=True for development, set to False for production
