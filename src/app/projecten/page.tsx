import { load } from "outstatic/server";
import ContentGrid from "@/components/ContentGrid";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const { content, allPosts, allProjects } = await getData();

  return (
    <div className="max-w-6xl mx-auto px-5">
      <section className="mt-16 mb-16 md:mb-12">
        <div
          className="prose lg:prose-2xl text-2xl font-semibold leading-9"
          dangerouslySetInnerHTML={{ __html: content }}
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
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "projecten" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  const allPosts = await db
    .find({ collection: "posts" }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "tags",
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  const allProjects = await db
    .find({ collection: "projecten" }, ["title", "slug", "coverImage"])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    content,
    allPosts,
    allProjects,
  };
}
