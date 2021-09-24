import { gql } from "graphql-request";
import { graphcms } from "../../lib/_graphcms";
import parse from "html-react-parser";
import Navbar from "../../components/Navbar";

const enum_type = {
    GUEST_SPEAKER: "Guest Speaker",
    CAREER: "Career",
    PANNEL_SESSION: "Panel Session",
};

export default function events({ event }) {
    const report_date = new Date(event.updatedAt).toLocaleDateString("en-US", {
        timeZone: "EST",
    });
    return (
        <div className="h-full w-full bg-black pb-8">
            <Navbar />
            <div className="text-white font-sans font-extrabold mx-8 pt-32">
                <a className="m-4" href="/events">
                    {"<"} Back to events
                </a>
            </div>

            <div className="flex flex-col items-center text-white">
                <div className="flex flex-col items-center w-4/6">
                    <div className="flex flex-col items-center w-6/12">
                        <p className="font-serif text-2xl my-4 text-blue-highlight">
                            {enum_type[event.articleType]}
                        </p>
                        <p className="font-serif text-5xl text-center">
                            {event.title}
                        </p>
                        <img
                            className="object-cover h-20 w-20 rounded-full my-4"
                            src={event.author.image.url}
                            alt="author_img"
                        ></img>
                        <p>
                            {event.author.name} on {report_date}
                        </p>
                    </div>
                    <div className="h-auto w-9/12 mt-4 flex flex-col space-between font-sans font-medium">
                        {parse(event.report.html)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const slug = params.slug;

    const query = gql`
        query Event($slug: String!) {
            event(where: { slug: $slug }) {
                id
                createdAt
                updatedAt
                slug
                title
                author {
                    name
                    image {
                        url
                    }
                }
                image {
                    url
                }
                date
                report {
                    html
                }
                articleType
                summary
            }
        }
    `;

    const data = await graphcms.request(query, { slug });

    return {
        props: { event: { ...data.event } },
        revalidate: 60 * 60,
    };
};

export const getStaticPaths = async () => {
    const query = gql`
        query Events {
            events {
                slug
            }
        }
    `;
    const data = await graphcms.request(query);

    return {
        paths: data.events.map((event) => ({
            params: { slug: event.slug },
        })),
        fallback: "blocking",
    };
};
