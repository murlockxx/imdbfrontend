import React from 'react';
import { Link } from 'react-router-dom';
import './CelebCard.css'; // Ensure you have corresponding styles in CelebCard.css

const CelebCard = ({ actor }) => {
    return (
        <div className="card celeb-card">
            <Link to={`/actor/${encodeURIComponent((actor.name ))}`}>
                {actor.photoUrl ? (
                    <img src={actor.photoUrl} className="card-img-top" alt={`${actor.name} ${actor.surname}`} />
                ) : (
                    <div className="no-image">No image available.</div>
                )}
            </Link>
            <div className="card-body">
                <Link to={`/actor/${encodeURIComponent((actor.name ))}`} className="card-title-link">
                    <h5 className="card-title-celeb">{actor.name} {actor.surname}</h5>
                </Link>
                {actor.nickName && <p className="nickname">"aka" {actor.nickName}</p>}
                <div className="bio">
                    {/* Additional details or bio can be shown here if available */}
                </div>
            </div>
        </div>
    );
};

export default CelebCard;
