import { load } from "outstatic/server";
import ContentGrid from "../components/ContentGrid";
import markdownToHtml from "../lib/markdownToHtml";

export default async function Index() {
  const { content, coverImage, overContent, allProjects } = await getData();
  return (
    <>
      <div className="relative w-screen">
        <div className="max-w-6xl mx-auto p-0 md:pt-16 md:pb-16">
          <div
            className="relative w-full prose max-w-2xl lg:prose-xl font-semibold leading-9 z-10 p-4 rounded bg-background-transparent backdrop-blur-md text-black"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <img
          alt={"Cover Image"}
          src={coverImage || ""}
          className="absolute top-0 left-0 object-cover object-contain opacity-80 w-full h-full z-4"
        />
      </div>
      <div className="max-w-6xl mx-auto px-5 pt-10">
        <section className="relative mt-16 mb-16">
          <div
            className="relative prose lg:prose-2xl text-2xl font-semibold leading-9"
            dangerouslySetInnerHTML={{ __html: overContent }}
          />
        </section>
        {allProjects.length > 0 && (
          <ContentGrid
            title="Projecten"
            items={allProjects}
            collection="projecten"
          />
        )}
      </div>
    </>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "home" }, [
      "content",
      "coverImage",
      "title",
    ])
    .first();

  const content = await markdownToHtml(page.content);

  const over = await db
    .find({ collection: "pages", slug: "over" }, ["content"])
    .first();

  const overContent = await markdownToHtml(over.content);

  const allProjects = await db
    .find({ collection: "projecten" }, ["title", "slug", "coverImage"])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    content,
    coverImage: page.coverImage,
    overContent,
    allProjects,
  };
}
