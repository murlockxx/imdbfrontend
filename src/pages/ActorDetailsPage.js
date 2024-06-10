import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ActorDetails.css'; // Import the CSS file

function ActorDetailsPage() {
    const { actorName } = useParams(); // Use the actor's name from the URL
    const [actor, setActor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActorDetails = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/v1/actor/getDetails/${encodeURIComponent(actorName)}`);
            if (!response.ok) {
              throw new Error('Actor not found');
            }
            const data = await response.json();
            setActor(data);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        };
      
        fetchActorDetails();
      }, [actorName]);  // Depend on actorName
      

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!actor) return <div className="error-message">No data found.</div>;

    return (
        <div className="actor-details">
            <h1>{actor.name} {actor.surname}</h1>
            {actor.nickName && <p className="nickname">"aka": {actor.nickName}</p>}
            {actor.photoUrl ? (
                <img src={actor.photoUrl} alt={`${actor.name} ${actor.surname}`} />
            ) : (
                <p>No image available.</p>
            )}
            {/* Additional details can be added here as they become available */}
            <div className="bio">
                {/* If there's a bio or additional details, they can be shown here */}
            </div>
        </div>
    );
}

export default ActorDetailsPage;
