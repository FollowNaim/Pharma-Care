import logo1 from "@/assets/logo/logo.png";
import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Useful Links",
    links: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Shop",
        href: "/shop",
      },
      {
        title: "Carts",
        href: "/carts",
      },
    ],
  },

  {
    title: "Internal Links",
    links: [
      {
        title: "SignIn",
        href: "/auth/signin",
      },
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Update Profile",
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        title: "Twitter",
        href: "https://x.com",
      },
      {
        title: "LinkedIn",
        href: "https://linkedin.com",
      },
      {
        title: "Facebook",
        href: "https://facebook.com",
      },
    ],
  },
  {
    title: "Top Sold",
    links: [
      {
        title: "Thermometer",
        href: "/shop",
      },
      {
        title: "Hair Oil",
        href: "/shop",
      },
      {
        title: "Napa Extra",
        href: "/shop",
      },
    ],
  },
];

const Footer01Page = () => {
  return (
    <div className="flex flex-col">
      <footer>
        <div className="container">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-8 gap-y-10 px-4">
            <div className="col-span-full xl:col-span-2">
              <h2 className="flex items-center gap-2">
                <img className="size-8" src={logo1} alt="" />{" "}
                <p className="font-bold text-xl">Pharma Care</p>
              </h2>

              <p className="mt-4 text-muted-foreground">
                Your One-Stop Pharmacy – <br /> Trusted Medicines and Wellness
                Essentials Delivered to Your Doorstep!
              </p>
            </div>

            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        to={href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-4">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Pharma Care
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="https://x.com" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="https://dribble.com" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="https://twitch.com" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="https://github.com" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer01Page;
