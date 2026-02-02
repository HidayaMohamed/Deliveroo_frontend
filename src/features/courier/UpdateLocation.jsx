import { useState, useEffect } from 'react';
import '../../styles/UpdateLocation.css';

const UpdateLocation = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;

    if (isTracking && 'geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(newLocation);
          sendLocationUpdate(newLocation);
        },
        (err) => {
          setError(err.message);
          console.error('Geolocation error:', err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const sendLocationUpdate = async (loc) => {
    try {
      const response = await fetch('/api/courier/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          latitude: loc.latitude,
          longitude: loc.longitude,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setLastUpdate(new Date());
        setError(null);
        if (onLocationUpdate) onLocationUpdate();
      }
    } catch (error) {
      console.error('Error updating location:', error);
      setError('Failed to update location');
    }
  };

  const toggleTracking = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setIsTracking(!isTracking);
  };

  const manualUpdate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(newLocation);
          sendLocationUpdate(newLocation);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  };

  return (
    <div className="update-location">
      <h3>Location Updates</h3>
      
      <div className="location-info">
        {location.latitude && location.longitude ? (
          <div className="coordinates">
            <div className="coordinate-item">
              <span className="label">Latitude:</span>
              <span className="value">{location.latitude.toFixed(6)}</span>
            </div>
            <div className="coordinate-item">
              <span className="label">Longitude:</span>
              <span className="value">{location.longitude.toFixed(6)}</span>
            </div>
          </div>
        ) : (
          <p className="no-location">No location data</p>
        )}
      </div>

      {lastUpdate && (
        <div className="last-update">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      )}

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <div className="location-controls">
        <button
          className={`tracking-toggle ${isTracking ? 'active' : ''}`}
          onClick={toggleTracking}
        >
          {isTracking ? '⏸️ Stop Tracking' : '▶️ Start Auto-Tracking'}
        </button>
        
        <button
          className="manual-update"
          onClick={manualUpdate}
          disabled={isTracking}
        >
          📍 Update Now
        </button>
      </div>

      <div className="tracking-status">
        <span className={`status-indicator ${isTracking ? 'active' : ''}`}></span>
        {isTracking ? 'Live tracking active' : 'Tracking inactive'}
      </div>
    </div>
  );
};

export default UpdateLocation;