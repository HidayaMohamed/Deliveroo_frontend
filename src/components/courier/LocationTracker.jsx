import { useState, useEffect } from 'react';
import '../../styles/LocationTracker.css';

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setAccuracy(position.coords.accuracy);
          setError(null);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported');
    }
  }, []);

  return (
    <div className="location-tracker">
      {error ? (
        <div className="tracker-error">
          <p>⚠️ {error}</p>
        </div>
      ) : location ? (
        <div className="tracker-active">
          <div className="location-display">
            <div className="coord">
              <span className="coord-label">Lat:</span>
              <span className="coord-value">{location.latitude.toFixed(6)}</span>
            </div>
            <div className="coord">
              <span className="coord-label">Lng:</span>
              <span className="coord-value">{location.longitude.toFixed(6)}</span>
            </div>
          </div>
          {accuracy && (
            <div className="accuracy">
              Accuracy: ±{Math.round(accuracy)}m
            </div>
          )}
          <div className="tracking-indicator">
            <span className="pulse"></span>
            Live tracking
          </div>
        </div>
      ) : (
        <div className="tracker-loading">
          Getting location...
        </div>
      )}
    </div>
  );
};

export default LocationTracker;