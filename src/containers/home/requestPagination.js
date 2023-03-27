import React from 'react'

const RequestPagination = (props) => {
  const { sm, page, setPage, pages, pageLength, total, slicedTotal } = props
  const pagenationSecLength = 7

  const getPageNum = (idx, currPage, lastPage) => {
    return idx === 1 ||
      idx === lastPage ||
      (idx > currPage - 2 && idx < currPage + 2)
      ? idx
      : idx === 2 || idx === lastPage - 1
      ? '...'
      : ''
  }

  return (
    <nav
      className="flex items-center justify-between p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        {sm && 'Showing'}&nbsp;
        <span className="dark:text-white font-semibold text-gray-800 dark:text-white-100">
          {(page - 1) * pageLength + 1}-{(page - 1) * pageLength + slicedTotal}
        </span>
        &nbsp; of&nbsp;
        <span className="dark:text-white text-gray-800 dark:font-semibold dark:text-white-100">
          {total}
        </span>
      </span>
      <ul className="inline-flex list-none items-center -space-x-px">
        <li className={1 >= page ? 'cursor-not-allowed' : ''}>
          <a
            href="#"
            onClick={() => setPage(page - 1)}
            className={`${
              1 >= page ? 'pointer-events-none' : ''
            } bg-white dark:hover:text-white ml-0 block rounded-l-[6px] border border-gray-300 px-3 py-2 text-[14px] leading-tight text-gray-500 hover:bg-gray-700 hover:text-white-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {new Array(pages)
          .fill(0)
          .map((zero, fIdx) => getPageNum(fIdx + 1, page, pages))
          .filter((item, idx) => item !== '')
          .map((pIdx, idx) => (
            <li
              key={`page-number-${idx}`}
              onClick={() => pIdx !== '...' && setPage(pIdx)}
            >
              <a
                href="#"
                className={`${
                  page === idx ? 'dark:bg-gray-700' : ''
                } bg-white dark:hover:text-white border border-gray-300 px-3 py-2 text-[14px] leading-tight text-gray-500 hover:bg-gray-700 hover:text-white-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700`}
              >
                {pIdx}
              </a>
            </li>
          ))}
        <li className={pages - 1 < page ? 'cursor-not-allowed' : ''}>
          <a
            href="#"
            onClick={() => setPage(page + 1)}
            className={`${
              pages - 1 < page ? 'pointer-events-none' : ''
            } bg-white dark:hover:text-white block rounded-r-[6px] border border-gray-300 px-3 py-2 text-[14px] leading-tight text-gray-500 hover:bg-gray-700 hover:text-white-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default RequestPagination
