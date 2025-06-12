import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// Icons
import { Helmet } from "react-helmet";
import {
  HiArrowLeft,
  HiCalendar,
  HiCheckCircle,
  HiChevronDown,
  HiCollection,
  HiDocumentText,
  HiExclamationCircle,
  HiLocationMarker,
  HiMail,
  HiPencil,
  HiRefresh,
  HiSave,
  HiTag,
  HiUser,
} from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const artifactTypes = [
  "Tools",
  "Weapons",
  "Documents",
  "Writings",
  "Pottery",
  "Jewelry",
  "Coins",
  "Sculptures",
  "Religious Items",
  "Household Items",
  "Art",
  "Textiles",
  "Other",
];

export default function Update() {
  const axiosSecure = useAxiosSecure();

  const { artifactId } = useParams();

  const [formData, setFormData] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    shortDescription: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    adderName: "",
    adderEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Simulate loading existing data
  useEffect(() => {
    const fetchExistingArtifact = async () => {
      try {
        setIsLoading(true);
        const response = await axiosSecure.get(`/artifacts/${artifactId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching existing artifact:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingArtifact();
  }, [artifactId, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      artifactType: type,
    }));
    setIsDropdownOpen(false);
    if (errors.artifactType) {
      setErrors((prev) => ({
        ...prev,
        artifactType: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus(null);

    const { _id, ...updatedFormData } = formData;

    // update existing artifact to the database
    try {
      axiosSecure.put(`/artifacts/${artifactId}`, updatedFormData);

      setSaveStatus("success");
      console.log("Artifact updated successfully:", updatedFormData);
    } catch (error) {
      setSaveStatus("error");
      console.error("Error updating artifact:", error);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600/30 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-xl">Loading artifact data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden">
      <Helmet>
        <title>Update | ArtifactVault</title>
      </Helmet>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-slate-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Link
            to={`/artifacts/${formData.id}`}
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors group mb-6"
          >
            <HiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Artifact Details
          </Link>

          <div className="inline-flex items-center rounded-md px-4 py-2 text-white text-sm font-medium mb-6 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-orange-500/20">
            <HiPencil className="mr-2 h-4 w-4" />
            Update Artifact
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-slate-800">
            Edit <span className="text-amber-600">Artifact</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Update and refine your artifact information
          </p>
        </div>

        {/* Main Content - Single Form */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="p-8 space-y-8">
              {/* Basic Information Section */}
              <div className="border-b border-amber-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <HiCollection className="h-6 w-6 text-amber-500" />
                  Basic Information
                </h2>
                <div className="space-y-6">
                  {/* Artifact Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Artifact Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiCollection className="h-5 w-5 text-amber-400/50" />
                      </div>
                      <input
                        type="text"
                        name="artifactName"
                        value={formData.artifactName}
                        onChange={handleInputChange}
                        className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Enter artifact name"
                      />
                    </div>
                  </div>

                  {/* Artifact Image */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Artifact Image URL *
                    </label>
                    <input
                      type="url"
                      name="artifactImage"
                      value={formData.artifactImage}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="https://example.com/artifact-image.jpg"
                    />
                  </div>

                  {/* Artifact Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Artifact Type *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiTag className="h-5 w-5 text-amber-400/50" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="block w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-300 rounded text-left text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      >
                        {formData.artifactType || "Select artifact type"}
                      </button>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <HiChevronDown
                          className={`h-5 w-5 text-amber-400/50 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white border border-slate-300 rounded shadow-xl max-h-60 overflow-auto">
                          {artifactTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => handleTypeSelect(type)}
                              className="w-full px-4 py-3 text-left text-slate-800 hover:bg-amber-50 transition-colors border-b border-slate-200 last:border-b-0"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="border-b border-amber-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <HiDocumentText className="h-6 w-6 text-orange-400" />
                  Description
                </h2>
                <div className="space-y-6">
                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Short Description *
                    </label>
                    <textarea
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                      placeholder="Brief description of the artifact..."
                    />
                  </div>

                  {/* Historical Context */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Historical Context *
                    </label>
                    <textarea
                      name="historicalContext"
                      value={formData.historicalContext}
                      onChange={handleInputChange}
                      rows={6}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                      placeholder="Describe the historical period, civilization, and cultural significance..."
                    />
                  </div>
                </div>
              </div>

              {/* Timeline & Discovery Section */}
              <div className="border-b border-amber-200 pb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <HiCalendar className="h-6 w-6 text-slate-300" />
                  Timeline & Discovery
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Created At */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Created At
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <HiCalendar className="h-5 w-5 text-amber-400/50" />
                        </div>
                        <input
                          type="text"
                          name="createdAt"
                          value={formData.createdAt}
                          onChange={handleInputChange}
                          className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="e.g., 100 BC"
                        />
                      </div>
                    </div>

                    {/* Discovered At */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Discovered At
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <HiCalendar className="h-5 w-5 text-amber-400/50" />
                        </div>
                        <input
                          type="text"
                          name="discoveredAt"
                          value={formData.discoveredAt}
                          onChange={handleInputChange}
                          className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          placeholder="e.g., 1799"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Discovered By */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Discovered By
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiUser className="h-5 w-5 text-amber-400/50" />
                      </div>
                      <input
                        type="text"
                        name="discoveredBy"
                        value={formData.discoveredBy}
                        onChange={handleInputChange}
                        className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Name of discoverer or expedition"
                      />
                    </div>
                  </div>

                  {/* Present Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Present Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiLocationMarker className="h-5 w-5 text-amber-400/50" />
                      </div>
                      <input
                        type="text"
                        name="presentLocation"
                        value={formData.presentLocation}
                        onChange={handleInputChange}
                        className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Current museum or location"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributor Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <HiUser className="h-6 w-6 text-slate-300" />
                  Contributor Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiUser className="h-5 w-5 text-amber-400/30" />
                      </div>
                      <input
                        type="text"
                        value={formData.adderName}
                        readOnly
                        className="block w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HiMail className="h-5 w-5 text-amber-400/30" />
                      </div>
                      <input
                        type="email"
                        value={formData.adderEmail}
                        readOnly
                        className="block w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded text-slate-600 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Actions */}
              <div className="flex justify-end items-center gap-4 pt-6">
                <button
                  type="button"
                  className="bg-transparent hover:bg-slate-100 text-slate-600 border border-slate-400 px-6 py-3 rounded transition-colors flex items-center"
                >
                  <HiRefresh className="mr-2 h-4 w-4" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded font-semibold shadow-lg disabled:opacity-50 transition-all flex items-center"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <HiSave className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Save Status Notification */}
        {saveStatus && (
          <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded shadow-lg ${
                saveStatus === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {saveStatus === "success" ? (
                <HiCheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <HiExclamationCircle className="h-6 w-6 text-red-400" />
              )}
              <span className="font-medium">
                {saveStatus === "success"
                  ? "Artifact updated successfully!"
                  : "Failed to update artifact"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
