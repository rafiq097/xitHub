import Repo from "./Repo";

const Repos = ({ repos, alwaysFullWidth = false }) => {
  const containerClassName = alwaysFullWidth ? "w-full" : "lg:w-2/3 w-full";
  const listClassName = "relative border-s border-gray-200";

  return (
    <div
      className={`bg-glass rounded-lg px-4 py-6 lg:px-8 lg:py-6 ${containerClassName}`}
    >
      <ol className={listClassName}>
        {repos.length === 0 ? (
          <p className="flex items-center justify-center h-32">
            No repos found
          </p>
        ) : (
          repos.map((repo) => <Repo key={repo.id} repo={repo} />)
        )}
      </ol>
    </div>
  );
};

export default Repos;
