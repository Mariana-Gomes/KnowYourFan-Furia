import { Post } from "../components/Post";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

import { posts } from "../constants";

export function Timeline() {
  return (
    <div>
      <Header />
      <div
        className={
          "max-w-[70rem] mx-auto my-8 px-4 grid grid-cols-[256px_1fr] gap-8 items-start max-md:block"
        }
      >
        <Sidebar />
        <main className="space-y-6 max-md:mt-5">
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </main>
      </div>
    </div>
  );
}
