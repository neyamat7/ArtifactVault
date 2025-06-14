import { motion } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { Link, NavLink, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../context/AuthContext/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import CrossIcon from "../Icons/CrossIcon.jsx";
import Logo from "../Logo/Logo.jsx";
import { Avatar, AvatarImage } from "./Avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Dropdown.jsx";

export default function Navbar() {
  const { pathname } = useLocation();

  const { user, signOutUser, setUser } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 1, to: "/", text: "Home" },
    { id: 2, to: "/artifacts", text: "All Artifacts" },
    { id: 3, to: "/add-artifact", text: "Add Artifacts" },
    { id: 4, to: "/aboutUs", text: "About Us" },
  ];

  const links = (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.id}
          to={link.to}
          end
          className={({ isActive }) =>
            ` hover:text-amber-600 transition-colors text-sm font-medium ${
              isActive ? "text-amber-600" : "text-slate-600"
            }`
          }
        >
          {link.text}
        </NavLink>
      ))}
    </>
  );

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        setUser(null);
        toast.success("successfully signed out");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-amber-200 bg-white/95 backdrop-blur"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {links}

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant={pathname === "/login" ? "primary" : "outline"}
                  size="sm"
                >
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* User Dropdown */}
              <DropdownMenu>
                {({ isOpen, setIsOpen }) => (
                  <>
                    <DropdownMenuTrigger onClick={() => setIsOpen(!isOpen)}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full ring-2 ring-amber-200 hover:ring-amber-400 transition-all"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user?.photoURL}
                            alt={user?.displayName}
                          />
                        </Avatar>
                      </motion.button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      isOpen={isOpen}
                      align="end"
                      className="w-56 border-amber-200"
                    >
                      <div className="flex items-center justify-start gap-2 p-3">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-slate-800">
                            {user?.displayName}
                          </p>
                          <p className="text-xs text-slate-500">
                            Artifact Explorer
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator className="bg-amber-100" />
                      <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <NavLink
                          to="/my-artifacts"
                          className={({ isActive }) =>
                            ` hover:text-amber-600 transition-colors text-sm font-medium w-full  py-1 ${
                              isActive ? "text-amber-600" : "text-slate-600"
                            }`
                          }
                        >
                          My Artifacts
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <NavLink
                          to="/liked-artifacts"
                          className={({ isActive }) =>
                            ` hover:text-amber-600 transition-colors text-sm font-medium w-full  py-1 ${
                              isActive ? "text-amber-600" : "text-slate-600"
                            }`
                          }
                        >
                          Liked Artifacts
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-amber-100" />
                      <DropdownMenuItem
                        onClick={() => {
                          handleLogOut();
                          setIsOpen(false);
                        }}
                        className="text-slate-800 hover:text-red-700 focus:text-red-700"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}

      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-auto max-h-screen w-80 bg-white shadow-2xl z-50 lg:hidden rounded-l-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 py-4 border-b border-black/20">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-xl">ArtifactVault</h2>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <CrossIcon />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <nav className="p-6">
                <div className="space-y-2 flex flex-col gap-5">{links}</div>

                {!user ? (
                  <div className="pt-6 border-t border-white/20">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline">Login</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="mt-2 border-t border-white/20">
                    {/* User Profile */}
                    <div className="flex items-center gap-4 my-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                      <Avatar className="h-12 w-12 ring-2 ring-amber-400/50">
                        <AvatarImage
                          src={user?.photoURL}
                          alt={user?.displayName}
                        />
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-black text-base">
                          {user?.displayName}
                        </p>
                        <p className="text-sm text-amber-400 font-medium">
                          Artifact Explorer
                        </p>
                      </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2">
                      <NavLink
                        to="/my-artifacts"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 w-full py-1 rounded-xl font-medium transition-all duration-200 ${
                            isActive
                              ? "text-amber-500 borde"
                              : "text-slate-500 hover:text-amber-600"
                          }`
                        }
                      >
                        My Artifacts
                      </NavLink>

                      <NavLink
                        to="/liked-artifacts"
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 w-full rounded-xl font-medium transition-all duration-200 py-1 ${
                            isActive
                              ? "text-amber-400  "
                              : "text-slate-500  hover:text-amber-600"
                          }`
                        }
                      >
                        Liked Artifacts
                      </NavLink>
                    </div>
                  </div>
                )}
              </nav>

              {/* Footer */}
              {user && (
                <div className="border-t border-white/20 pl-6 pb-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <IoIosLogOut className="mr-1" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </motion.header>
  );
}
