import React from "react";

export const NAVIGATION = [
    {
        name: "Home",
        route: "/home",
    },
    {
        name: "Events",
        route: "/events",
    },
    {
        name: "Members",
        route: "/members",
    },
    {
        name: "Jobs",
        route: "/jobs",
    },
    {
        name: "Partners",
        route: "/partners",
    },
    {
        name: "Contact",
        route: "/contact",
    },
];

function Navbar() {
    return (
        <div>
            <header className="bg-black p-4 h-20 flex flex-row justify-between items-center">
                <img src="logo.svg" alt="logo" />
                <div>
                    {NAVIGATION.map(({ name, route }) => (
                        <a
                            className="text-white text-bold p-2"
                            key={name}
                            href={route}
                        >
                            {name}
                        </a>
                    ))}
                </div>
                <div></div>
            </header>
        </div>
    );
}

export default Navbar;
