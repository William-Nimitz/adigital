import React, { useState, useMemo } from 'react'
import { useGetAuth } from '@provider/userProvider'
import { navigate } from 'gatsby'

import Down from '@images/icons/arrow.svg'
import ClockIcon from '@images/icons/clock.svg'
import { requestStatus, checkDays } from '@constants/config'

import { Text, Dropdown, BadgeStatus } from '@components/common'

import MobileColumn from './mobileColumn'
import RequestPagination from './requestPagination'

const RequestsTable = (props) => {
  const { requests, search, sm, extraData } = props
  const [user] = useGetAuth()

  const tableHeaders = [
    { key: 'id', label: 'ID', sorted: false },
    { key: 'userName', label: 'REQUEST NAME', sorted: false },
    { key: 'createdAt', label: 'DATE CREATED', sorted: true },
    { key: 'support_range', label: 'SUPPORT RANGE', sorted: false },
    { key: 'updatedAt', label: 'LAST UPDATED', sorted: false },
    { key: 'status', label: 'STATUS', sorted: false },
  ]

  const [sorted, setSorted] = useState({ key: 'date_created', dir: 'desc' })

  const isSorted = (field) => sorted?.key === field && sorted?.dir === 'asc'

  const openDetailRequest = (item) => {
    navigate(`requests/${item?.id.toLowerCase()}`)
  }

  const [filterByLastDate, setFilterByLastDate] = useState(null)
  const pageLength = 10
  const [page, setPage] = useState(1)

  const { tableData, total, slicedTotal, pages } = useMemo(() => {
    const mockTableData = [...requests]
    const _mockTableData =
      extraData === null || extraData.length === 0
        ? mockTableData
        : [...mockTableData, ...extraData]

    const filteredDate = _mockTableData
      .filter((item) => user?.role === 'admin' || item.userId === user?.id)
      .filter(
        (item) =>
          item?.title.toLowerCase().includes(search.toLowerCase()) ||
          item?.id.toLowerCase().includes(search.toLowerCase())
      )

    const sortedDate = filteredDate
      .slice(pageLength * (page - 1), pageLength * page)
      .sort((a, b) => {
        if (sorted?.key === 'id') {
          return sorted?.dir === 'asc'
            ? a[sorted?.key] - b[sorted?.key]
            : b[sorted?.key] - a[sorted?.key]
        }
        if (sorted?.key === 'request_name' || sorted?.key === 'status') {
          if (a[sorted?.key] > b[sorted?.key]) {
            return sorted?.dir === 'asc' ? -1 : 1
          } else if (b[sorted?.key] > a[sorted?.key]) {
            return sorted?.dir === 'asc' ? 1 : -1
          } else {
            return 0
          }
        }
        return sorted?.dir === 'asc'
          ? new Date(a[sorted?.key]) - new Date(b[sorted?.key])
          : new Date(b[sorted?.key]) - new Date(a[sorted?.key])
      })

    if (!sm && filterByLastDate) {
      return
      const filterdByDate = sortedDate.filter((item) => {
        return (
          (new Date().getTime() - new Date(item?.last_updated).getTime()) /
            (1000 * 60 * 60 * 24) <=
          filterByLastDate.key
        )
      })
      return filterdByDate
    }
    const len = filteredDate?.length
    const _slicedTotal = sortedDate?.length
    const pages = Math.ceil(len / pageLength)

    return {
      tableData: sortedDate,
      total: len,
      slicedTotal: _slicedTotal,
      pages: pages,
    }
  }, [search, sorted, extraData, filterByLastDate, sm, page])

  return (
    <div className="h-full-72x relative flex w-full flex-col justify-between overflow-auto bg-white-200 dark:bg-gray-800">
      {sm ? (
        <div className="w-custom-scroll overflow-auto">
          <table className="w-full min-w-[1260px] text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-black-700 w-full bg-gray-100 text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tableHeaders.map((th) => (
                  <th
                    scope="col"
                    className="sticky px-6 py-3"
                    key={`table-header-${th.key}`}
                  >
                    <Text style="thStyle">{th.label}</Text>
                    <Down
                      className={`ml-[7px] inline h-[6px] w-2.5x cursor-pointer transition-transform duration-200 ${
                        isSorted(th.key) ? 'rotate-180' : ''
                      }`}
                      onClick={() =>
                        setSorted({
                          key: th.key,
                          dir: isSorted(th.key) ? 'desc' : 'asc',
                        })
                      }
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr
                  className="bg-white cursor-pointer border-b hover:bg-white-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  key={`request-${item.id}`}
                  onClick={() => openDetailRequest(item)}
                >
                  <th
                    scope="row"
                    className="flex items-center whitespace-nowrap px-6 py-4"
                  >
                    <div className="pl-3">
                      <Text>{item.id}</Text>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <Text>{item.title}</Text>
                  </td>
                  <td className="px-6 py-4 dark:text-white-100">
                    <Text style="primaryGray">{item.createdAt}</Text>
                  </td>
                  <td className="px-6 py-4 dark:text-white-100">
                    <Text>{`${item.startDate} - ${item.endDate}`}</Text>
                  </td>
                  <td className="px-6 py-4 dark:text-white-100">
                    <Text style="primaryGray">{item.updatedAt}</Text>
                  </td>
                  <td className="px-6 py-4 dark:text-white-100">
                    <BadgeStatus
                      text={requestStatus[item.status]?.value}
                      style={item.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <Dropdown
            icon={<ClockIcon />}
            placeholder="Last 30 days"
            moreStylesWrapper="!mt-5"
            items={checkDays}
            onChange={(val) => {}}
          />
          <div className="border-t-8 border-gray-300 dark:border-gray-500">
            {tableData.map((item) => (
              <MobileColumn
                item={item}
                handleClick={() => openDetailRequest(item)}
                key={`request-mobile-${item.id}`}
              />
            ))}
          </div>
        </div>
      )}

      <RequestPagination
        sm={sm}
        page={page}
        setPage={setPage}
        total={total}
        pages={pages}
        pageLength={pageLength}
        slicedTotal={slicedTotal}
      />
    </div>
  )
}

export default RequestsTable
