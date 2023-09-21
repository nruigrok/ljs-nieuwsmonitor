import { load } from "outstatic/server";
import markdownToHtml from "@/lib/markdownToHtml";

export default async function Index() {
  const { content } = await getData();
  return (
    <>
      <div className="max-w-6xl mx-auto px-5">
        <section className="relative mt-16 mb-16 md:mb-12">
          <div
            className="relative prose lg:prose-2xl text-2xl font-semibold leading-9"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      </div>
    </>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "over" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  return { content };
}
