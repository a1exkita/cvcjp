import { gql } from "graphql-request";
import { graphcms } from "../../lib/_graphcms";
import Navbar from "../../components/Navbar";

export default function events({ data }) {
    return (
        <div className="flex flex-col bg-black absolute">
            <Navbar />
            <h1 className="font-serif font-extrabold text-5xl ml-8 mt-32 text-white">
                Events
            </h1>
            <h5 className="font-sans font-medium text-sm ml-8 text-gray-text">
                Here’s the list of CVC Japan members. Feel free to send
                messages.
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4  p-8 text-white">
                {data.events.map((event) => (
                    <div key={event.slug}>{event.title}</div>
                ))}
            </div>
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const query = gql`
        query Events {
            events {
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
                body {
                    html
                }
            }
        }
    `;

    const data = await graphcms.request(query);

    return {
        props: { data: { ...data } },
        revalidate: 60 * 60,
    };
};
