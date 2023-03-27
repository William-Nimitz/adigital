import { Fragment, useState } from 'react'
import useMediaQuery from '@hooks/useMediaQuery'
import Layout from '@components/layout'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import CalendarIcon from '@images/icons/calendar.svg'
import ArrowIcon from '@images/icons/leftarrow.svg'
import { Button, Dropdown, Modal, Text } from '@components/common'
import RequestModal from '@components/common/modals/requestModal'
import PlusIcon from '@images/icons/plus.svg'
import { Menu, Transition } from '@headlessui/react'
import { toastType, openToast } from '@components/common'
import { calendarViews } from '@constants/config'

const bgClassnameStatus = {
  progress:
    'w-fit whitespace-nowrap rounded-md bg-yellow-200 dark:bg-yellow-900 px-0.5 px-2.5 text-center  text-xs text-yellow-800 dark:text-yellow-100',
  completed:
    'w-fit whitespace-nowrap rounded-md bg-green-100 dark:bg-green-900 px-0.5 px-2.5 text-center text-xs text-green-800 dark:text-green-300',
  declined:
    'w-fit whitespace-nowrap rounded-md bg-red-200 dark:bg-red-900 px-0.5 px-2.5 text-center text-xs text-gray-900 dark:text-red-300',
}

const days = [
  { date: '2021-12-27', events: [] },
  { date: '2021-12-28', events: [] },
  { date: '2021-12-29', events: [] },
  { date: '2021-12-30', events: [] },
  { date: '2021-12-31', events: [] },
  { date: '2022-01-01', isCurrentMonth: true, events: [] },
  { date: '2022-01-02', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-03',
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: 'Design review',
        time: '10AM',
        datetime: '2022-01-03T10:00',
        status: 'declined',
        href: '#',
      },
      {
        id: 2,
        name: 'Sales meeting',
        time: '2PM',
        datetime: '2022-01-03T14:00',
        status: 'completed',
        href: '#',
      },
    ],
  },
  { date: '2022-01-04', isCurrentMonth: true, events: [] },
  { date: '2022-01-05', isCurrentMonth: true, events: [] },
  { date: '2022-01-06', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-07',
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: 'Date night',
        time: '6PM',
        datetime: '2022-01-08T18:00',
        status: 'completed',
        href: '#',
      },
    ],
  },
  { date: '2022-01-08', isCurrentMonth: true, events: [] },
  { date: '2022-01-09', isCurrentMonth: true, events: [] },
  { date: '2022-01-10', isCurrentMonth: true, events: [] },
  { date: '2022-01-11', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-12',
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: '2PM',
        datetime: '2022-01-25T14:00',
        status: 'completed',
        href: '#',
      },
    ],
  },
  { date: '2022-01-13', isCurrentMonth: true, events: [] },
  { date: '2022-01-14', isCurrentMonth: true, events: [] },
  { date: '2022-01-15', isCurrentMonth: true, events: [] },
  { date: '2022-01-16', isCurrentMonth: true, events: [] },
  { date: '2022-01-17', isCurrentMonth: true, events: [] },
  { date: '2022-01-18', isCurrentMonth: true, events: [] },
  { date: '2022-01-19', isCurrentMonth: true, events: [] },
  { date: '2022-01-20', isCurrentMonth: true, events: [] },
  { date: '2022-01-21', isCurrentMonth: true, events: [] },
  {
    date: '2022-01-22',
    isCurrentMonth: true,
    isSelected: true,
    events: [
      {
        id: 4,
        name: 'Maple syrup museum',
        time: '3PM',
        datetime: '2022-01-22T15:00',
        status: 'progress',
        href: '#',
      },
      {
        id: 5,
        name: 'Hockey game',
        time: '7PM',
        datetime: '2022-01-22T19:00',
        status: 'declined',
        href: '#',
      },
    ],
  },
  { date: '2022-01-23', isCurrentMonth: true, events: [] },
  { date: '2022-01-24', isCurrentMonth: true, events: [] },
  { date: '2022-01-25', isCurrentMonth: true, events: [] },
  { date: '2022-01-26', isCurrentMonth: true, events: [] },
  { date: '2022-01-27', isCurrentMonth: true, events: [] },
  { date: '2022-01-28', isCurrentMonth: true, events: [] },
  { date: '2022-01-29', isCurrentMonth: true, events: [] },
  { date: '2022-01-30', isCurrentMonth: true, events: [] },
  { date: '2022-01-31', isCurrentMonth: true, events: [] },
  { date: '2022-02-01', events: [] },
  { date: '2022-02-02', events: [] },
  {
    date: '2022-02-03',
    events: [
      {
        id: 7,
        name: 'Cinema with friends',
        time: '9PM',
        datetime: '2022-02-04T21:00',
        status: 'completed',
        href: '#',
      },
    ],
  },
  { date: '2022-02-04', events: [] },
  { date: '2022-02-05', events: [] },
  { date: '2022-02-06', events: [] },
]
const selectedDay = days.find((day) => day.isSelected)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
  const sm = useMediaQuery(`(min-width: 640px)`)
  const [openModal, setOpenModal] = useState(null)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const openCreateNewRequest = (val) => {
    setSelectedRequest(null)
    setOpenModal(val)
  }

  const handleExtraData = (val) => {
    openToast({
      content: 'New request submitted!',
      closed: true,
      status: toastType.SUCCESS,
    })
  }

  return (
    <Layout>
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="flex items-center justify-between pt-4 dark:bg-gray-800 md:px-6 md:!pt-0 lg:flex-none">
          <Button
            tabIndex="0"
            aria-label="New Requests Button"
            icon={<PlusIcon />}
            text={sm ? 'New Requests' : ''}
            style="primary"
            onClick={() => {
              openCreateNewRequest('createNewRequest')
            }}
            moreStyles="hidden tablet:flex tablet:w-full tablet:max-w-[14rem] sm:px-5 sm:py-2.5 !p-2.5 ml-3 tablet:mr-3 tablet:ml-0 border border-1 border-[#4DAE4F] tablet:border-none"
          />
          <div className="flex w-full items-center md:w-auto">
            <div className="flex w-full flex-col-reverse items-center md:ml-4 md:w-auto md:flex-row md:items-center">
              <Dropdown
                icon={<CalendarIcon className="text-gray-400" />}
                placeholder="Last 30 days"
                moreStylesWrapper="!mt-5"
                items={calendarViews}
                onChange={(val) => {
                  setFilterByLastDate(val)
                }}
              />
              {/* <div className="ml-6 h-6 w-px bg-gray-300" /> */}
              {/* <button
                type="button"
                className="text-white ml-6  rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add event
              </button> */}

              <div className="bg-white relative flex items-center rounded-md md:items-stretch">
                <div
                  className="pointer-events-none absolute inset-0 rounded-md"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-l-md py-2 pl-3 pr-4 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:relative hover:dark:bg-gray-500 md:w-9 md:px-2"
                >
                  <span className="sr-only">Previous month</span>
                  <ArrowIcon
                    className="h-5 w-5 text-gray-800 dark:text-white-200"
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  className="whitespace-nowrap px-3.5 font-semibold hover:bg-gray-100 focus:relative  hover:dark:bg-gray-500 md:block"
                >
                  <Text style="primary" moreStyles="!text-lg">
                    4 April 2021
                  </Text>
                </button>
                {/* <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" /> */}
                <button
                  type="button"
                  className="flex items-center justify-center rounded-r-md py-2 pl-4 pr-3 text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:relative hover:dark:bg-gray-500  md:w-9 md:px-2"
                >
                  <span className="sr-only">Next month</span>
                  <ArrowIcon
                    className="h-5 w-5 rotate-180 text-gray-800 dark:text-white-200"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="h-full-n-scroll overflow-y-auto bg-white-200  shadow  dark:bg-gray-800 lg:flex lg:flex-auto lg:flex-col">
          <div className="hidden grid-cols-7 gap-px bg-gray-100 text-center text-xs font-semibold leading-6 text-gray-700 dark:bg-gray-700 lg:grid lg:flex-none">
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                M
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  on
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                T
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  ue
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                W
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  ed
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                T
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  hu
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                F
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  ri
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                S
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  at
                </Text>
              </span>
            </div>
            <div className="bg-white py-2">
              <Text style="primary" moreStyles="font-semibold">
                S
              </Text>
              <span className="sr-only sm:not-sr-only">
                <Text style="primary" moreStyles="font-semibold">
                  un
                </Text>
              </span>
            </div>
          </div>
          <div className="flex bg-gray-100 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full bg-gray-200  dark:bg-gray-700 lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days.map((day, idx) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? 'bg-white'
                      : `bg-gray-100 text-gray-500 dark:bg-gray-800`,
                    `relative py-2 px-3 ${
                      idx % 7 === 0 || idx % 7 === 6
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'bg-white-200  dark:bg-gray-800'
                    }`,
                    `${
                      day.events.length > 0 &&
                      "relative overflow-hidden border-2 border-gray-200 after:absolute after:top-[-1.5rem] after:left-[-1.5rem] after:ml-0.5 after:h-14 after:w-10 after:rotate-45  after:!bg-gray-200 after:content-[''] dark:border-gray-500 after:dark:!bg-gray-500"
                    }`
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? 'text-white ml-auto flex h-6 w-6 items-center justify-center rounded-full  bg-primary font-semibold'
                        : undefined
                    }
                  >
                    <Text
                      style="primary"
                      moreStyles={`flex justify-end ${
                        day.isToday && '!text-white-200'
                      }`}
                    >
                      {day.date.split('-').pop().replace(/^0/, '')}
                    </Text>
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 2).map((event) => (
                        <li
                          key={event.id}
                          className={`${
                            bgClassnameStatus[event.status]
                          } m-0 mb-1 flex w-full`}
                        >
                          <a
                            href={event.href}
                            className="group flex w-full justify-between"
                          >
                            <div className="truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              <Text>{event.name}</Text>
                            </div>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              <Text style="primary">{event.time}</Text>
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li className="text-gray-500">
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-1 gap-px bg-gray-200 dark:bg-gray-700 lg:hidden lg:grid-cols-7 lg:grid-rows-6">
              {days.map((day, idx) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth
                      ? `bg-white ${
                          idx % 7 === 0 || idx % 7 === 6
                            ? 'bg-gray-100 dark:bg-gray-700'
                            : 'bg-white-200  dark:bg-gray-800'
                        }`
                      : `bg-gray-100 ${
                          idx % 7 === 0 || idx % 7 === 6
                            ? 'bg-gray-100 dark:bg-gray-700'
                            : 'bg-white-200  dark:bg-gray-800'
                        }`,
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isToday && 'text-indigo-600',
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-900',
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      'text-gray-500',
                    `flex h-full min-h-[10rem] flex-col py-2 px-3 hover:bg-gray-100 focus:z-10 ${
                      day.events.length > 0 &&
                      "after:dark!bg-gray-500 relative overflow-hidden border-2 border-gray-200 after:absolute after:top-[-1.5rem] after:left-[-1.5rem] after:ml-0.5 after:h-14 after:w-10  after:rotate-45 after:!bg-gray-200 after:content-[''] dark:border-gray-500"
                    }`
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isSelected &&
                        'flex h-6 w-6 items-center justify-center rounded-full',
                      day.isSelected && day.isToday && 'bg-indigo-600',
                      day.isSelected && !day.isToday && 'bg-gray-900',
                      'ml-auto'
                    )}
                  >
                    <Text style="primary">
                      {day.date.split('-').pop().replace(/^0/, '')}
                    </Text>
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 && (
                    <ol className="mt-2 w-full">
                      {day.events.slice(0, 2).map((event) => (
                        <li
                          key={event.id}
                          className={`${
                            bgClassnameStatus[event.status]
                          } m-0 mb-1 flex w-full`}
                        >
                          <a
                            href={event.href}
                            className="group flex w-full justify-between"
                          >
                            <div className="truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              <Text>{event.name}</Text>
                            </div>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              <Text style="primary">{event.time}</Text>
                            </time>
                          </a>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li className="text-gray-500">
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                    // <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    //   {day.events.map((event) => (
                    //     <span
                    //       key={event.id}
                    //       className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                    //     />
                    //   ))}
                    // </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDay?.events.length > 0 && (
          <div className="hidden py-10 px-4 sm:px-6">
            <ol className="bg-white divide-y divide-gray-100 overflow-hidden rounded-lg text-sm shadow ring-1 ring-black ring-opacity-5">
              {selectedDay.events.map((event) => (
                <li
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-500 hover:bg-gray-500"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <time
                      dateTime={event.datetime}
                      className="mt-2 flex items-center text-gray-700"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <Text style="primary">{event.time}</Text>
                    </time>
                  </div>
                  <a
                    href={event.href}
                    className="bg-white ml-6 flex-none self-center rounded-md py-2 px-3 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    Edit<span className="sr-only">, {event.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {openModal ? (
        <Modal
          title={'createNewRequest'}
          closeHandler={setOpenModal}
          content={
            <RequestModal
              defaultValues={selectedRequest}
              subject={openModal}
              setCloseModal={setOpenModal}
              handleData={handleExtraData}
            />
          }
        />
      ) : null}
    </Layout>
  )
}
