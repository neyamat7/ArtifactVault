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

export const getArtifactById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch artifact");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching artifact:", error);
    throw error;
  }
};

//  like and dislike an artifact
export const likeAndDislikeArtifact = async (artifactId, action, userEmail) => {
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts/${artifactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, userEmail }),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${action} artifact`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error ${action} artifact:`, error);
    throw error;
  }
};
