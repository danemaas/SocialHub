import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const pathname = useLocation().pathname;

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => (
        <Link
          to={link.route}
          key={link.label}
          className={`bottombar-link group ${
            pathname === link.route && "bg-primary-500 rounded-[10px]"
          } flex-center flex-col gap-1 p-2 transition`}
        >
          <img
            src={link.imgURL}
            alt={link.label}
            className={`group-hover:invert-white ${
              pathname === link.route && "invert-white"
            }  w-4 h-4`}
          />
          <p className="tiny-medium text-light-2">{link.label}</p>
        </Link>
      ))}
    </section>
  );
};

export default Bottombar;
