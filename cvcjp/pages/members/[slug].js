import { gql } from "graphql-request";
import { graphcms } from "../../lib/_graphcms";

export default function members({ member }) {
    return (
        <div>
            <p>{member.name}</p>
            <p>{member.bio}</p>
            <img src={member.image.url} alt="img" />
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
