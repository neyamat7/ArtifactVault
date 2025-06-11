const API_BASE_URL = "http://localhost:3000";

// add an artifact
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

// update an artifact
export const updateArtifact = async (artifactId, artifactData) => {
  console.log(artifactData);
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts/${artifactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artifactData),
    });

    if (!response.ok) {
      throw new Error("Failed to update artifact");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating artifact:", error);
    throw error;
  }
};

// get all artifacts
export const getArtifacts = async (userEmail) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artifacts${userEmail ? `?email=${userEmail}` : ""}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch artifacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
};

// get featured artifacts

export const getFeaturedArtifacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/artifacts/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured artifacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching featured artifacts:", error);
    throw error;
  }
};

//get artifacts by id
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

// get liked artifacts by user email
export const getLikedArtifacts = async (userEmail) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/artifacts/liked?email=${userEmail}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch liked artifacts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching liked artifacts:", error);
    throw error;
  }
};
