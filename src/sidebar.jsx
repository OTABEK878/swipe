// Muhammad Siddiq
import { Home, Gamepad2, CalendarDays, BarChart3, User } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "add game", path: "/games", icon: Gamepad2 },
    { name: "Add swiper", path: "/swiper", icon: CalendarDays },
    { name: "all user", path: "/stats", icon: BarChart3 },
    { name: "profile", path: "/profile", icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed z-50 inset-x-0 bottom-4 flex justify-center lg:hidden">
        <div className="w-[360px] max-w-[95%] bg-[#1c1c1c] rounded-2xl p-2 shadow-2xl backdrop-blur-md border border-gray-800">
          <div className="flex items-center justify-between">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center w-16 h-14 text-xs"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabMobile"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600"
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 24,
                          }}
                        />
                      )}
                      <Icon
                        size={22}
                        className={`z-10 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`z-10 mt-1 text-xs font-medium ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1c1c]/90 backdrop-blur-lg border-r border-gray-800 shadow-2xl">
        <div className="flex flex-col w-full">
          {/* Logo */}
          <div className="p-8 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-orange-400 to-orange-600 opacity-70 rounded-full" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <Gamepad2
                  size={48}
                  className="text-white drop-shadow-lg"
                  strokeWidth={3}
                />
                <div className="absolute inset-0 flex items-center justify-center rotate-45">
                  <div className="w-12 h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-stretch gap-2 px-4 pb-8">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="relative flex items-center gap-4 h-12 px-4 rounded-xl overflow-hidden"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabDesktop"
                          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600"
                          transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 24,
                          }}
                        />
                      )}
                      <Icon
                        size={22}
                        className={`z-10 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`z-10 text-sm font-medium ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
