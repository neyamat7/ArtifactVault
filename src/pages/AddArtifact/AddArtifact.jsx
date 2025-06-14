import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";
import Button from "../../components/Button/Button";

import {
  HiCalendar,
  HiChevronDown,
  HiCollection,
  HiDocumentText,
  HiLocationMarker,
  HiMail,
  HiPhotograph,
  HiPlus,
  HiTag,
  HiUser,
} from "react-icons/hi";
import useAuth from "../../context/AuthContext/AuthContext";
import { artifactTypes } from "../../data/artifactTypes";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import artifactAnimationData from "../../assets/lotties/addArtifact.json";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { validateAddArtifactForm } from "../../utils/Validation";

export default function AddArtifact() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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
    adderName: user?.displayName,
    adderEmail: user?.email || user?.providerData[0]?.email,
  });

  const [errors, setErrors] = useState({
    artifactName: "",
    artifactImage: "",
    artifactType: "",
    historicalContext: "",
    shortDescription: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      adderName: user?.displayName,
      adderEmail: user?.email || user?.providerData[0]?.email,
    }));
  }, [user]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here

    const isValid = validateAddArtifactForm(formData, setErrors);

    if (!isValid) return;

    const newArtifact = {
      ...formData,
      likes: [],
    };

    axiosSecure
      .post("/add-artifact", newArtifact)
      .then((res) => {
        toast.success("New Artifact added successfully!");
        navigate("/my-artifacts");
      })
      .catch((error) => {
        toast.error("Failed to add new artifact!");
        console.error("Error adding artifact:", error);
      });

    // Reset form after submission
    setFormData({
      artifactName: "",
      artifactImage: "",
      artifactType: "",
      historicalContext: "",
      shortDescription: "",
      createdAt: "",
      discoveredAt: "",
      discoveredBy: "",
      presentLocation: "",
      adderName: user?.displayName,
      adderEmail: user?.email || user?.providerData[0]?.email,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-slate-100">
      <title>Add | ArtifactVault</title>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Animation and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24"
          >
            <div className="text-center lg:text-left mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full px-4 py-2 text-amber-800 text-sm font-medium mb-6 bg-gradient-to-r from-amber-100 to-amber-200"
              >
                <HiPlus className="mr-2 h-4 w-4" />
                Contribute to History
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Add New <span className="text-amber-600">Artifact</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Share your archaeological discoveries with the world. Help
                preserve history for future generations.
              </p>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 mb-8">
              <Lottie
                animationData={artifactAnimationData}
                loop={true}
                autoplay={true}
                className="w-full h-full"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Submission Guidelines
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide accurate historical information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use high-quality images with valid URLs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include detailed descriptions and context</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Verify discovery information when possible</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Artifact Name */}
                <div>
                  <label
                    htmlFor="artifactName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Artifact Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiCollection className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="artifactName"
                      name="artifactName"
                      value={formData.artifactName}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                        errors.artifactName
                          ? "border-red-300 bg-red-50"
                          : "border-slate-300 bg-white"
                      }`}
                      placeholder="Enter artifact name"
                    />
                  </div>
                  {errors.artifactName && errors.artifactName}
                </div>

                {/* Artifact Image */}
                <div>
                  <label
                    htmlFor="artifactImage"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Artifact Image URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiPhotograph className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="url"
                      id="artifactImage"
                      name="artifactImage"
                      value={formData.artifactImage}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                        errors.artifactImage
                          ? "border-red-300 bg-red-50"
                          : "border-slate-300 bg-white"
                      }`}
                      placeholder="https://example.com/artifact-image.jpg"
                    />
                  </div>
                  {errors.artifactImage && errors.artifactImage}
                </div>

                {/* Artifact Type Dropdown */}
                <div>
                  <label
                    htmlFor="artifactType"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Artifact Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiTag className="h-5 w-5 text-slate-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                        errors.artifactType
                          ? "border-red-300 bg-red-50"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      <span
                        className={
                          formData.artifactType
                            ? "text-slate-900"
                            : "text-slate-400"
                        }
                      >
                        {formData.artifactType || "Select artifact type"}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <HiChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 mt-1 w-full bg-white border border-slate-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                      >
                        {artifactTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => handleTypeSelect(type)}
                            className="w-full px-4 py-3 text-left hover:bg-amber-50 hover:text-amber-700 transition-colors border-b border-slate-100 last:border-b-0"
                          >
                            {type}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  {errors.artifactType && errors.artifactType}
                </div>

                {/* Historical Context */}
                <div>
                  <label
                    htmlFor="historicalContext"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Historical Context
                  </label>
                  <textarea
                    id="historicalContext"
                    name="historicalContext"
                    value={formData.historicalContext}
                    onChange={handleInputChange}
                    rows={4}
                    className={`block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none ${
                      errors.historicalContext
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-white"
                    }`}
                    placeholder="Describe the historical period, civilization, and cultural significance..."
                  />
                  {errors.historicalContext && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {errors.historicalContext}
                    </motion.p>
                  )}
                </div>

                {/* Short Description */}
                <div>
                  <label
                    htmlFor="shortDescription"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Short Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                      <HiDocumentText className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none ${
                        errors.shortDescription
                          ? "border-red-300 bg-red-50"
                          : "border-slate-300 bg-white"
                      }`}
                      placeholder="Brief description of the artifact..."
                    />
                  </div>
                  {errors.shortDescription && errors.shortDescription}
                </div>

                {/* Created At & Discovered At Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="createdAt"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Created At
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiCalendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="createdAt"
                        name="createdAt"
                        value={formData.createdAt}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="e.g., 100 BC"
                      />
                    </div>
                    {errors.createdAt && errors.createdAt}
                  </div>

                  <div>
                    <label
                      htmlFor="discoveredAt"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Discovered At
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiCalendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="discoveredAt"
                        name="discoveredAt"
                        value={formData.discoveredAt}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="e.g., 1799"
                      />
                    </div>
                    {errors.discoveredAt && errors.discoveredAt}
                  </div>
                </div>

                {/* Discovered By */}
                <div>
                  <label
                    htmlFor="discoveredBy"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Discovered By
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiUser className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="discoveredBy"
                      name="discoveredBy"
                      value={formData.discoveredBy}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Name of discoverer or expedition"
                    />
                  </div>
                  {errors.discoveredBy && errors.discoveredBy}
                </div>

                {/* Present Location */}
                <div>
                  <label
                    htmlFor="presentLocation"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Present Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiLocationMarker className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      id="presentLocation"
                      name="presentLocation"
                      value={formData.presentLocation}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Current museum or location"
                    />
                  </div>
                  {errors.presentLocation && errors.presentLocation}
                </div>

                {/* Adder Information (Read-only) */}
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-4">
                    Contributor Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiUser className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.adderName || ""}
                          readOnly
                          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-slate-100 text-slate-600 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HiMail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          value={formData.adderEmail || ""}
                          readOnly
                          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-slate-100 text-slate-600 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <HiPlus className="mr-2 h-5 w-5" />
                    Add Artifact
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
