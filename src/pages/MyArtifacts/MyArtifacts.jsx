import { useEffect, useState } from "react";
import { Link } from "react-router";

// Icons
import {
  HiCalendar,
  HiCollection,
  HiLocationMarker,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import Swal from "sweetalert2";
import useAuth from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ArtifactsPage() {
  const axiosSecure = useAxiosSecure();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  console.log("token", user?.accessToken);

  useEffect(() => {
    const fetchMyArtifacts = async () => {
      try {
        const email = user?.email ? `email=${user?.email}` : null;

        // const data = await getArtifacts( email);
        const response = await axiosSecure.get(`/artifacts?${email}`);

        const data = response.data;
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyArtifacts();
  }, [user?.email, axiosSecure]);

  const handleDelete = async (artifactId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/artifacts/${artifactId}`);
        setArtifacts((prev) => prev.filter((art) => art._id !== artifactId));
        Swal.fire("Deleted!", "Artifact has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting artifact:", error);
        Swal.fire("Error", "Failed to delete artifact.", "error");
      }
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <HiCollection className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">
            Loading your artifacts...
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                My <span className="text-amber-600">Artifacts</span>
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your artifact collection
              </p>
            </div>
            <Link
              to="/add-artifact"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Add New Artifact
            </Link>
          </div>
        </div>
      </div>

      {/* Artifacts List */}
      <div className="container mx-auto px-4 py-8">
        {artifacts.length < 1 ? (
          <div className="text-center py-16">
            <HiCollection className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No artifacts found
            </h3>
            <p className="text-slate-500 mb-6">
              Start building your collection by adding your first artifact.
            </p>
            <Link
              to="/artifacts/add"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Add First Artifact
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {artifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 md:flex-shrink-0">
                    <img
                      src={artifact.artifactImage}
                      alt={artifact.artifactName}
                      className="w-full h-48 md:h-full object-fill"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                            {artifact.artifactName}
                          </h3>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 self-start">
                            {artifact.artifactType}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-slate-600">
                            <HiCalendar className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium mr-2">Created:</span>
                            <span>{artifact.createdAt}</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <HiLocationMarker className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium mr-2">Location:</span>
                            <span>{artifact.presentLocation}</span>
                          </div>
                          <div className="flex items-start text-sm text-slate-600">
                            <HiCollection className="h-4 w-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                            <span className="font-medium mr-2">
                              Discovered by:
                            </span>
                            <span>{artifact.discoveredBy}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-slate-200">
                        <Link
                          to={`/update/${artifact._id}`}
                          className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <HiPencil className="mr-2 h-4 w-4" />
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(artifact._id)}
                          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <HiTrash className="mr-2 h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
