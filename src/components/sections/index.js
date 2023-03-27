import React from 'react'

const Section = ({ section, isBelowHero, border, downArrow, ...rest }) => {
  switch (section.__typename) {
    default:
      return null
  }
}

const Sections = ({ sections, products }) => {
  return sections
    ?.filter((s) => s?.__typename)
    ?.map((section, index) => (
      <Section
        section={section}
        isBelowHero={index === 1}
        border={section?.border}
        downArrow={section?.downArrow}
        key={section?.id + index}
        shopifyProducts={products}
      />
    ))
}

export default Sections
