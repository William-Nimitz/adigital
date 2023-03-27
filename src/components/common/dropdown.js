import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ClockIcon from '@images/icons/clock.svg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({
  items,
  choosed = null,
  onChange,
  moreStylesWrapper,
  moreStylesBox,
  icon,
  moreStyleItems,
  moreLabelStyles,
  label,
}) {
  const [selected, setSelected] = useState(choosed || items[0])

  const handleChange = (val) => {
    onChange(val)
    setSelected(val)
  }

  return (
    <>
      {label && (
        <label
          className={`mb-2 block text-sm font-medium normal-case not-italic text-gray-700 dark:text-white-200 ${moreLabelStyles}`}
        >
          {label}
        </label>
      )}
      <Menu
        as="div"
        className={`relative inline-block w-full px-4 pb-6 pt-1 text-left ${moreStylesWrapper}`}
      >
        <div>
          <Menu.Button
            className={`bg-white inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-normal text-gray-400 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100 dark:text-white-100 dark:ring-gray-600 dark:hover:bg-gray-700 ${moreStylesBox}`}
          >
            {icon}
            {selected?.value}
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`bg-white  absolute right-0 z-10 mt-2 mr-[1rem] w-[calc(100%-2rem)] origin-top-right rounded-md   bg-white-200 shadow-lg ring-1 ring-gray-300 focus:outline-none dark:bg-gray-800 dark:ring-gray-600 ${moreStyleItems}`}
          >
            <div className="py-1">
              {items?.length > 0 &&
                items.map((item) => (
                  <Menu.Item
                    key={`dropdown-${item.key}`}
                    onClick={() => handleChange(item)}
                  >
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-primary text-white-100'
                            : 'text-gray-700 dark:text-white-100',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {item?.value}
                      </a>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
