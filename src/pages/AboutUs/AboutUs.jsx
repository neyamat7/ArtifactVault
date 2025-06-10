"use client";

import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiOutlineAcademicCap,
  HiOutlineGlobe,
  HiOutlineHeart,
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Lead Archaeologist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ph.D in Archaeology with over 15 years of experience in field research and artifact preservation.",
    },
    {
      name: "Michael Chen",
      role: "Digital Curator",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Specializes in digital preservation and creating immersive experiences for historical artifacts.",
    },
    {
      name: "Amara Okafor",
      role: "Historical Researcher",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Expert in ancient civilizations with a focus on cultural context and artifact significance.",
    },
    {
      name: "James Rodriguez",
      role: "Technology Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Leads our digital initiatives and ensures artifacts are presented with cutting-edge technology.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Preserving History, One Artifact at a Time
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-amber-100"
            >
              Discover the story behind our mission to document and share the
              world's most precious historical treasures.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/artifacts"
                className="inline-flex items-center bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Explore Collection
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-4">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Why We Document{" "}
                <span className="text-amber-600">Artifacts</span>
              </h2>
              <p className="text-lg text-slate-600">
                We believe that understanding our past is essential to building
                our future. Our mission is to preserve, document, and share the
                world's historical artifacts with everyone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
              >
                <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <HiOutlineGlobe className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Global Preservation
                </h3>
                <p className="text-slate-600">
                  We work with museums and institutions worldwide to document
                  artifacts that tell the story of human civilization, ensuring
                  they're preserved digitally for future generations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
              >
                <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <HiOutlineLightBulb className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Educational Access
                </h3>
                <p className="text-slate-600">
                  We believe knowledge should be accessible to all. Our platform
                  provides detailed information about historical artifacts to
                  students, researchers, and curious minds everywhere.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
              >
                <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <HiOutlineHeart className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Cultural Appreciation
                </h3>
                <p className="text-slate-600">
                  By showcasing artifacts from diverse cultures and time
                  periods, we foster greater understanding and appreciation of
                  our shared human heritage and unique cultural differences.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md border border-slate-200"
              >
                <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <HiOutlineAcademicCap className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  Research Support
                </h3>
                <p className="text-slate-600">
                  Our detailed documentation and high-quality imagery support
                  academic research, enabling scholars to study artifacts
                  remotely and make new historical connections.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  From Field Research to{" "}
                  <span className="text-amber-600">Digital Archive</span>
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Our journey began in 2015 when a team of archaeologists and
                  digital preservationists came together with a shared vision:
                  to create a comprehensive digital archive of the world's most
                  significant historical artifacts.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                  What started as a small project documenting artifacts in local
                  museums has grown into a global initiative, partnering with
                  institutions across six continents and documenting over 10,000
                  artifacts.
                </p>
                <p className="text-lg text-slate-600">
                  Today, we continue to expand our collection, improve our
                  documentation techniques, and find new ways to share these
                  treasures with the world.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
              >
                <div className="aspect-square bg-amber-100 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Team at work"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 aspect-video bg-orange-100 rounded-lg overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Artifact documentation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-medium text-sm mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Meet the <span className="text-amber-600">Experts</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Our diverse team brings together expertise in archaeology,
                history, digital preservation, and technology to create the most
                comprehensive artifact documentation platform.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800">
                      {member.name}
                    </h3>
                    <p className="text-amber-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Join Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl mb-8 text-amber-100"
            >
              There are many ways to contribute to our work of preserving and
              sharing historical artifacts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <HiOutlineUserGroup className="h-10 w-10 text-amber-200 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Volunteer</h3>
                <p className="text-amber-100">
                  Join our team of volunteers helping with research,
                  documentation, and community outreach.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <HiOutlineAcademicCap className="h-10 w-10 text-amber-200 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Contribute</h3>
                <p className="text-amber-100">
                  Share your expertise or submit information about artifacts in
                  your region.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <HiOutlineMail className="h-10 w-10 text-amber-200 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Partner</h3>
                <p className="text-amber-100">
                  Museums and institutions can partner with us to document their
                  collections.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Get In Touch
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  10,000+
                </div>
                <div className="text-slate-600">Artifacts Documented</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">42</div>
                <div className="text-slate-600">Partner Museums</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">6</div>
                <div className="text-slate-600">Continents</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  1.2M
                </div>
                <div className="text-slate-600">Monthly Visitors</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
