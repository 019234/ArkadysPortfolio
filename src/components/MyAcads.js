export default function MyAcads({ title, description, description1, description2, date }) {
  return (
    <article className="mt-10 mb-10">
      <div className="block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Title and Date Row */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="font-normal font-semibold text-gray-700 dark:text-gray-400">
            {date}
          </p>
        </div>

        {/* Descriptions */}
        <p className="font-normal mt-5 text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description1}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description2}
        </p>
      </div>
    </article>
  );
}