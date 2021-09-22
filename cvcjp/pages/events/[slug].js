import { gql } from "graphql-request";
import { graphcms } from "../../lib/_graphcms";

export default function events({ event }) {
    return (
        <div>
            <p>{event.name}</p>
            <p>{event.bio}</p>
            <img src={event.image.url} alt="img" />
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const slug = params.slug;

    const query = gql`
        query Event($slug: String!) {
            event(where: { slug: $slug }) {
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
