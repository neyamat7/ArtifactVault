import { motion } from "framer-motion";
import { useState } from "react";
import { HiCollection, HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router";
import useAuth from "../../context/AuthContext/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import { Avatar, AvatarImage } from "./Avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Dropdown.jsx";

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  console.log(user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const userEmail = user?.email || user?.providerData[0].email;

  const links = (
    <>
      <Link
        to="/"
        className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
      >
        Home
      </Link>
      <Link
        to="/artifacts"
        className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
      >
        All Artifacts
      </Link>
      <Link
        to="/add-artifact"
        className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
      >
        Add Artifacts
      </Link>

      <Link
        to="/aboutUs"
        className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
      >
        About Us
      </Link>
    </>
  );

  const handleLogOut = () => {
    console.log("sign out clicked");

    signOutUser()
      .then(() => {
        console.log("signout success");
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
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full p-2 shadow-lg bg-gradient-to-br from-amber-600 to-amber-700">
              <HiCollection className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Historical Artifacts
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {links}

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
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
                        <Link
                          to="/my-artifacts"
                          className="text-slate-700 hover:text-amber-600 w-full  py-1"
                        >
                          My Artifacts
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsOpen(false)}>
                        <Link
                          to="/liked-artifacts"
                          className="text-slate-700 hover:text-amber-600 w-full py-1"
                        >
                          Liked Artifacts
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-amber-100" />
                      <DropdownMenuItem
                        onClick={() => {
                          handleLogOut();
                          setIsOpen(false);
                        }}
                        className="text-red-600 hover:text-red-700 focus:text-red-700"
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="container lg:hidden py-4 border-t border-amber-200 bg-white"
        >
          <nav className="flex flex-col gap-4">
            {links}

            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            ) : (
              <div className="border-t border-amber-100 pt-4 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                  </Avatar>
                  <div>
                    <p className="font-medium text-slate-800">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-slate-500">Artifact Explorer</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/my-artifacts"
                    className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    My Artifacts
                  </Link>
                  <Link
                    to="/liked-artifacts"
                    className="text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    Liked Artifacts
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start p-0 text-red-600 hover:text-red-700 hover:bg-transparent"
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
