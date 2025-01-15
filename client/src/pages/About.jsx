import Header from "../components/Header";
import "./Pages.css";

const About = () => {
  return (
    <div>
      <Header />
      <h1 className="pageTitle">Frequently Asked Questions</h1>

      <h2>1. Who is Show Stalker created for?</h2>
      <p>
        Show Stalker is designed for TV enthusiasts who follow multiple shows
        and struggle to keep track of when new episodes or seasons are released.
        Whether you’re juggling a dozen favorite series or just want to stay
        updated on a few key shows, Show Stalker makes it easy to stay in the
        loop.
      </p>

      <h2>
        2. How does Show Stalker help you stay up-to-date on your favorite
        shows?
      </h2>
      <p>
        Show Stalker allows you to subscribe to your favorite shows, and it
        automatically syncs upcoming episodes with your Google Calendar. This
        set it and forget it approach ensures youll never miss an episode,
        while making it easy to plan your viewing schedule around your life.
      </p>

      <h2>3. Can I use Show Stalker for free?</h2>
      <p>
        Yes! Show Stalker offers a free version with essential features like
        subscribing to shows and syncing episodes to your calendar. We also
        provide premium options with additional features, such as personalized
        recommendations and priority notifications.
      </p>

      <h2>4. What platforms does Show Stalker work with?</h2>
      <p>
        Show Stalker is accessible on any modern web browser. Its Google
        Calendar sync feature works seamlessly across devices, including your
        desktop, smartphone, or tablet, so your schedule is always up to date
        wherever you go.
      </p>

      <h2>5. How do I sync episodes with my Google Calendar?</h2>
      <p>
        Syncing is easy! Once youve subscribed to a show, Show Stalker
        automatically creates a calendar event for each upcoming episode. These
        events include details like the air date, time, and episode name. You
        can connect your Google account directly from the app to enable this
        feature in just a few clicks.
      </p>

      <h2>6. Does Show Stalker support international release dates?</h2>
      <p>
        Yes! Show Stalker adjusts for different time zones and supports
        international release schedules so you’ll always know exactly when an
        episode airs, no matter where you are in the world.
      </p>

      <h2>7. Can I customize my notifications?</h2>
      <p>
        Absolutely. You can choose when and how you receive notifications for
        upcoming episodes. Whether you prefer a reminder a day before, an hour
        before, or at the exact time the show airs, Show Stalker has you
        covered.
      </p>

      <h2>8. What happens if a show’s schedule changes?</h2>
      <p>
        If a show’s release date changes, Show Stalker automatically updates
        your calendar events to reflect the new schedule. You’ll always have the
        most accurate information without lifting a finger.
      </p>

      <h2>9. Can Show Stalker recommend new shows to me?</h2>
      <p>
        For premium users, Show Stalker provides personalized recommendations
        based on your viewing history and favorite genres. Discover your next
        binge-worthy series with ease!
      </p>

      <h2>10. Is my personal information safe with Show Stalker?</h2>
      <p>
        Yes, we take your privacy seriously. Show Stalker only accesses the
        information necessary to provide its services, such as syncing with your
        Google Calendar. Your data is encrypted and never shared with third
        parties.
      </p>
    </div>
  );
};

export default About;
