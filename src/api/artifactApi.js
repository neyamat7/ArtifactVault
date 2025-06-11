const API_BASE_URL = "http://localhost:3000";

export const addArtifact = async (artifactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artifactData),
    });

    if (!response.ok) {
      throw new Error("Failed to add artifact");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding artifact:", error);
    throw error;
  }
};


export const getArtifacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts`);
    if (!response.ok) {
      throw new Error("Failed to fetch artifacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
};
