const axios = require("axios");

exports.fetchRecommendations = async (req, res) => {
  const { grades, interests } = req.body;
  try {
    const response = await axios.post("http://localhost:5000/recommend", { grades, interests });
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error fetching recommendations");
  }
};
