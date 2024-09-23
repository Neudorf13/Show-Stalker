const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(express.json());

const base_url = "https://api.tvmaze.com/search/shows";

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "orange", "banana"] });
});

// {
//     array.map((fruit,index) => (
//         <div key={index}>
//           <p>{fruit}</p>
//           <br />
//         </div>
//       ))
//     }

//login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Username: ${username}, Password ${password}");

  if (username === "user" && password === "pass") {
    console.log("user+pass match");
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

// Handle the TVMaze API lookup
const handleShowLookUp = async (search_string) => {
  try {
    const query_url = `${base_url}?q=${encodeURIComponent(search_string)}`;
    const response = await axios.get(query_url);

    if (response.status === 200) {
      const shows = response.data;
      //   console.log(shows);
      //   shows.forEach((showObj) => {
      //     if (showObj.show.rating) {
      //       console.log(showObj.show.rating.average); // Log the medium image URL
      //     }
      //   });

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

//search bar route
app.post("/api/search", async (req, res) => {
  const query = req.body;
  const textValue = query.text; // Access the 'text' property directly
  console.log(`request: ${textValue}`);

  if (query && textValue) {
    console.log("Post request receiverd:", textValue);
    const showList = await handleShowLookUp(textValue);

    if (showList) {
      return res.status(200).json({ status: "success", shows: showList });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to retrieve shows" });
    }
  } else {
    return res.status(400).json({ status: "error", message: "Bad Request" });
  }
  //res.json({ success: true, message: 'Query received', data: query });
});

app.post("/api/detailedSearch", async (req, res) => {
  //fill in here

  try {
    const { id } = req.body;
    console.log("id is: " + id);
    const showDetails = await handleDetailedShowLookUp(id);
    console.log(showDetails);
    res.status(200).json(showDetails);
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
  //   console.log("test");
  //   const query = req.body;
  //   const id = query.id;
  //   console.log("id: " + id);

  //   if (!id) {
  //     return res.status(400).json({ message: "Show ID is required" });
  //   }

  //   const mockResponse = {
  //     id,
  //     name: "Sample Show",
  //     description: "This is a detailed description of the show.",
  //     genres: ["Drama", "Action"],
  //     rating: 8.7,
  //     image: "https://example.com/sample.jpg",
  //   };

  //   res.status(200).json(mockResponse);
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
