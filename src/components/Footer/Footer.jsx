import { motion } from "framer-motion";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { socialLinks } from "../../data/socialLinks";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="text-white bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Logo privateClasses="text-white" />
            <p className="text-slate-300 my-6 leading-relaxed">
              Preserving history through digital cataloging and community
              collaboration. Discover, share, and explore the world's most
              fascinating artifacts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-600 flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-amber-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { name: "All Artifacts", to: "/artifacts" },
                { name: "Featured Collection", to: "#featured" },
                { name: "Timeline Explorer", to: "#timeline" },
                { name: "Mystery Artifacts", to: "/#mystery" },
              ].map((link) => {
                if (link.to === "/artifacts") {
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.to}
                        className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={link.name}>
                    <a
                      href={link.to}
                      className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Community */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-amber-400">
              Community
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Add Artifact", to: "/add-artifact" },
                { name: "Discussion Forum", to: "/" },
                { name: "Research Papers", to: "/" },
                { name: "Events & Webinars", to: "/" },
                { name: "Blog", to: "/" },
                { name: "Newsletter", to: "/" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div> */}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-amber-400">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HiMail className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">info@artifactVault.com</p>
                  <p className="text-slate-400 text-sm">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiPhone className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">+88 01316-350853</p>
                  <p className="text-slate-400 text-sm">Support hotline</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HiLocationMarker className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300">House 12, Road 5</p>
                  <p className="text-slate-400 text-sm">Mirpur, Dhaka 1216</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <h5 className="text-sm font-semibold text-amber-400 mb-3">
                Stay Updated
              </h5>
              <p className="text-slate-400 text-sm mb-4">
                Subscribe to our newsletter for the latest discoveries and
                updates.
              </p>
              <Button
                className="w-full cursor-pointer"
                onClick={() => toast.success("Thanks for subscribing! 🎉")}
              >
                Subscribe Now
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} ArtifactVault. All rights reserved.
            </p>
            {/* <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                to="/"
                className="text-slate-400 hover:text-amber-400 transition-colors"
              >
                Accessibility
              </Link>
            </div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
