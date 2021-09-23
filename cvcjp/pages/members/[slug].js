// import { useState, useEffect } from "react";
import { gql } from "graphql-request";
import Navbar from "../../components/Navbar";
import { graphcms } from "../../lib/_graphcms";

const socialIcons = [
    {
        name: "linkedIn",
        url: "/linkedIn.svg",
    },
    {
        name: "twitter",
        url: "/twitter.svg",
    },
    {
        name: "github",
        url: "/github.svg",
    },
];

export default function members({ member }) {
    return (
        <div className="absolute h-full bg-black">
            <Navbar />
            <div className="flex flex-col">
                <div className="text-white font-sans font-extrabold mx-8 my-6 mt-32">
                    <a className="m-4" href="/members">
                        {"<"} Back to members
                    </a>
                </div>
                <div className="flex flex-row h-full mx-8">
                    <img
                        className="m-4 w-1/5 object-cover"
                        src={member.image.url}
                        alt="img"
                    />
                    <div className="flex flex-col m-4">
                        <h1 className="text-white text-5xl font-sans font-extrabold">
                            {member.name}
                        </h1>
                        <div className="flex flex-row mt-2">
                            <p className="text-gray-text font-medium">
                                {member.title} @
                            </p>
                            <p className="text-white font-medium">
                                {member.company}
                            </p>
                        </div>
                        <div className="flex flex-col my-4">
                            <h3 className="text-white text-3xl font-extrabold">
                                Bio
                            </h3>
                            <p className="text-white font-medium mt-2">
                                {member.bio}
                            </p>
                        </div>
                        <div className="flex flex-col my-4">
                            <h3 className="text-white text-3xl font-extrabold">
                                Social Media
                            </h3>
                            <div className="flex flex-row items-center justify-between w-40 mt-2">
                                <a href={member.linkedIn}>
                                    <img
                                        className="w-12 h-auto"
                                        src="/linkedIn.svg"
                                        alt="linkedIn"
                                    />
                                </a>
                                <a href={member.twitter}>
                                    <img
                                        className="w-12 h-auto"
                                        src="/twitter.svg"
                                        alt="twitter"
                                    />
                                </a>
                                <a href={member.instagram}>
                                    <img
                                        className="w-10 h-auto"
                                        src="/instagram.svg"
                                        alt="instagram"
                                    />
                                </a>
                                {/* {socialIcons.map(({ url, n }) => {
                                    <img
                                        key={n}
                                        className="w-24 h-auto"
                                        src={"/" + url}
                                        alt={n}
                                    />;
                                })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const slug = params.slug;

    const query = gql`
        query Member($slug: String!) {
            member(where: { slug: $slug }) {
                id
                name
                bio
                slug
                title
                linkedIn
                twitter
                instagram
                company
                image {
                    url
                }
            }
        }
    `;

    const data = await graphcms.request(query, { slug });

    return {
        props: { member: { ...data.member } },
        revalidate: 60 * 60,
    };
};

export const getStaticPaths = async () => {
    const query = gql`
        query Members {
            members {
                slug
            }
        }
    `;
    const data = await graphcms.request(query);

    return {
        paths: data.members.map((member) => ({
            params: { slug: member.slug },
        })),
        fallback: "blocking",
    };
};
