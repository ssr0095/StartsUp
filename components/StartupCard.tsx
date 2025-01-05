import { cn, farmatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity.types";
import { Skeleton } from "./ui/skeleton";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    _id,
    description,
    author,
    image,
    category,
    title,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between ">
        <p className="startup_card_date">{farmatDate(_createdAt)}</p>
        <div className="flex items-center gap-1.5">
          <EyeIcon className=" size-6 text-primary" />
          <p className="text-16-medium"> {views} </p>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium  line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <div>
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image ? author?.image : "https://placehold.co/48x48"}
              alt="placeHold"
              width={44}
              height={44}
              className="size-12 rounded-full bg-black"
            />
          </Link>
        </div>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={image ? image : "https://placehold.co/640x400"}
          alt="description image"
          width={640}
          height={400}
          className="startup-card_img"
        />
      </Link>
      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>{category}</Link>
        <Button className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map((index: number) => (
      <li key={cn("skeleton", index)} className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
          <Skeleton className="size-16 rounded-full" />
        </div>

        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-[400px] w-[640px] rounded-xl" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </li>
    ))}
  </>
);
