export default function Link({ href, title }) {
    return (
      <div>
        <a
          href={href}
          className="bg-whiteT1 flex-nowrap line-clamp-none w-fit rounded-full text-purpleT2 px-4 py-1"
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </div>
    );
  }
  