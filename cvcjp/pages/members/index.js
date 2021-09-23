import { gql } from "graphql-request";
import { graphcms } from "../../lib/_graphcms";
import Navbar from "../../components/Navbar";

export default function members({ data }) {
    return (
        <div className="flex flex-col bg-black absolute">
            <Navbar />
            <h1 className="font-serif font-extrabold text-5xl ml-8 mt-32 text-white">
                Members
            </h1>
            <h5 className="font-sans font-medium text-sm ml-8 text-gray-text">
                Here’s the list of CVC Japan members. Feel free to send
                messages.
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4  p-8">
                {data.members.map((member) => (
                    <div key={member.slug}>
                        <a href={"/members/" + member.slug}>
                            <div className="max-w-sm m-4 h-full lg:m-0 rounded overflow-hidden shadow-lg bg-gray-dark border border-gray-border hover:border-blue-highlight">
                                <img
                                    className="h-60 w-full object-cover"
                                    src={member.image.url}
                                    alt="img"
                                />
                                <div className="px-6 py-4">
                                    <div className="text-xl text-white mb-2 font-extrabold">
                                        {member.name}
                                    </div>
                                    <p className="text-white text-base">
                                        {member.title} @ {member.company}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const getStaticProps = async ({ params }) => {
    const query = gql`
        query Members {
            members {
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

    const data = await graphcms.request(query);

    return {
        props: { data: { ...data } },
        revalidate: 60 * 60,
    };
};
