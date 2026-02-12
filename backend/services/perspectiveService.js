import axios from "axios";

const API_KEY = process.env.PERSPECTIVE_API_KEY;

export const checkPerspectiveToxicity = async (text) => {
  try {
    const response = await axios.post(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`,
      {
        comment: { text },
        languages: ["en"],
        requestedAttributes: {
          TOXICITY: {},
          INSULT: {},
          THREAT: {},
          IDENTITY_ATTACK: {},
        },
      }
    );

    const scores = response.data.attributeScores;

    return {
      toxicity: scores.TOXICITY.summaryScore.value,
      insult: scores.INSULT.summaryScore.value,
      threat: scores.THREAT.summaryScore.value,
      identity: scores.IDENTITY_ATTACK.summaryScore.value,
    };
  } catch (error) {
    console.error("Perspective API error:", error.response?.data || error.message);
    return null; // fail safe
  }
};
