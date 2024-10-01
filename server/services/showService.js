//logic related to external show APIs in one place.

const axios = require('axios');
const base_url = "https://api.tvmaze.com/search/shows";
// Handle the TVMaze API lookup
const handleShowLookUp = async (search_string) => {
    try {
      const query_url = `${base_url}?q=${encodeURIComponent(search_string)}`;
      const response = await axios.get(query_url);
  
      if (response.status === 200) {
        const shows = response.data;
  
        const showNames = shows.map((item) => ({
          name: item.show.name,
          id: item.show.id,
          img: item.show.image ? item.show.image.medium : null,
          rating: item.show.rating ? item.show.rating.average : null,
        }));
  
        console.log(showNames);
        return showNames;
      } else {
        throw new Error("Failed to retrieve shows from TVMaze API");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleDetailedShowLookUp = async (id) => {
    try {
      //const query_url = `${base_url}?q=${encodeURIComponent(id)}`;
      //tt0944947
      // const query_url = "https://api.tvmaze.com/lookup/shows?thetvdb=" + id;
      //const query_url = "https://api.tvmaze.com/lookup/shows?imdb=tt0944947";
      //const query_url = "https://api.tvmaze.com/lookup/shows?thetvdb=121361";
      const query_url = "https://api.tvmaze.com/shows/" + id;
      console.log(query_url);
      const response = await axios.get(query_url);
  
      if (response.status === 200) {
        const show = response.data;
        console.log("show data from id search:");
        console.log(show);
        const showInformation = {
          name: show.name,
          id: show.id,
          img: show.image ? show.image.original : null,
          rating: show.rating ? show.rating.average : null,
          genres: show.genres,
          status: show.status,
          summary: show.summary,
        };
        return showInformation;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  module.exports = {
    handleShowLookUp,
    handleDetailedShowLookUp,
  };