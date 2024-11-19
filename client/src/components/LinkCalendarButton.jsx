const LinkCalendarButton = () => {
  const userID = localStorage.getItem("userID");
  const redirect_uri = "http://localhost:8080/api/calendar/oauth2/callback"; //DEVELOPMENT
  const clientID =
    "953851801147-s168o6tbd5813rn707m44pqmncf51c20.apps.googleusercontent.com"; //TODO
  const scope = "https://www.googleapis.com/auth/calendar";

  const state = encodeURIComponent(JSON.stringify({ userID }));
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${state}`;

  const handleLinkClick = () => {
    // Redirect to the Google OAuth URL
    window.location.href = googleAuthUrl;
  };

  return (
    <div>
      <button onClick={handleLinkClick}>Link Google Calendar</button>
    </div>
  );
};

export default LinkCalendarButton;
