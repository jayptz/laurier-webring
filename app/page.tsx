export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-12 md:px-20 lg:px-32">
      <div className="ml-auto max-w-lg">
        <p className="text-base leading-relaxed text-gray-600">
          Welcome to the official webring of students studying CS at{" "}
          <a
            href="https://www.wlu.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
          >
            WLU
          </a>{" "}
          in Ontario, Canada. This is an ongoing project to document one of the
          most talented student bodies in the world, all while making them more
          visible to the public.
        </p>
        <p className="mt-6 text-base leading-relaxed text-gray-600">
          If you&apos;re one of us, we welcome you with open arms (or in this
          case, open{" "}
          <a
            href="https://github.com/jayptz/laurier-webring"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple underline decoration-purple/30 underline-offset-2 transition-colors hover:text-purple-dark hover:decoration-purple"
          >
            PRs
          </a>
          ).
        </p>
      </div>
    </div>
  );
}
