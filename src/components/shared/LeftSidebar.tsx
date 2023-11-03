import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/authContext";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <div className="flex gap-1 items-center">
            <img
              src="/assets/images/logo.png"
              alt="SocialHub logo"
              className="w-8 h-13"
            />
            <h2 className="text-2xl font-bold">SocialHub</h2>
          </div>
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile.png"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => (
            <li
              key={link.label}
              className={`leftsidebar-link ${
                pathname === link.route && "bg-primary-500"
              }`}
            >
              <NavLink
                to={link.route}
                className="flex items-center gap-4 p-4 group"
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${
                    pathname === link.route && "invert-white"
                  }`}
                />
                <p>{link.label}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => signOut()}
        variant="ghost"
        className="shad-button_ghost"
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
