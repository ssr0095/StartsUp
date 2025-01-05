import { farmatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLISTS_BY_SLUG_QUERY,
  STARTUPS_QUERY_BY_ID,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPicks }] = await Promise.all([
    client.fetch(STARTUPS_QUERY_BY_ID, { id }),
    client.fetch(PLAYLISTS_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  const md = markdownit();
  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{farmatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post?.image}
          alt="thambnail"
          width={800}
          height={600}
          className="rounded-xl h-auto w-full"
        />

        <div className="max-w-4xl mx-auto mt-10 space-y-5">
          <div className="flex justify-between items-center gap-5 mb-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex items-center justify-between gap-2"
            >
              <Image
                src={post.author.image}
                alt="profile"
                width={64}
                height={64}
                className="shadow-xl rounded-full"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-gray-400">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="max-w-4xl font-outfit break-all prose"
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editor Picks</p>
          <ul className="mt-7 card_grid-sm">
            {editorPicks?.length > 0 &&
              editorPicks.map((post: StartupCardType, i: number) => (
                <StartupCard key={post._id} post={post} />
              ))}
          </ul>
        </div>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
