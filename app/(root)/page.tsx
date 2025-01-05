import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, {
  StartupCardSkeleton,
  StartupCardType,
} from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };
  // const posts = await client.fetch(STARTUPS_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  const session = await auth();

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, <br /> connect with Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <h2 className="text-30-semibold">
          {query ? `Search Results for "${query}"` : "All startups"}
        </h2>
        <ul className="mt-7 card_grid">
          <Suspense fallback={<StartupCardSkeleton />}>
            {posts?.length > 0 ? (
              posts.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post} />
              ))
            ) : (
              <p>No startups found</p>
            )}
          </Suspense>
        </ul>
      </section>
      <SanityLive />
    </>
  );
};

export default Home;
