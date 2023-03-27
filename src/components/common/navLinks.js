import { Link } from 'gatsby'

const NavLinks = ({ heading, links, onCLick }) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-serif text-base uppercase tracking-wider">
        {heading}
      </h3>
      <ul className="flex flex-col gap-1 opacity-80">
        {links.map(({ label, url, type }) => {
          if (type === 'external') {
            return (
              <li key={label}>
                <a
                  href={url}
                  onClick={onCLick}
                  target="_blank"
                  className="hover:text-orange-500 text-xs uppercase duration-500"
                  rel="noreferrer"
                >
                  {label}
                </a>
              </li>
            )
          }

          return (
            <li key={label}>
              <Link
                to={url}
                onClick={onCLick}
                className="hover:text-orange-500 text-xs uppercase duration-500"
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavLinks
