import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@context/localeContext'
import { isPreviewPage } from '@utils/preview'
import { fetchCPAEntry } from '@utils/fetch'

const EmbeddedEntry = ({ __typename, children, ...rest }) => {
  const forwardProps = { __typename, ...rest }
  switch (__typename) {
    default: {
      return <div />
    }
  }
}

const EmbeddedEntryContainer = ({ node, references, ...rest }) => {
  if (isPreviewPage()) {
    const id = node?.data?.target?.sys?.id
    const { locale } = useLocale()
    const { isLoading, error, data } = useQuery(
      [`Embedded Entry ${id}`, id, locale],
      () => fetchCPAEntry({ id, locale, include: 2 }),
      {
        enabled: !!id && !!locale,
      }
    )

    if (isLoading || error) return <div />
    const entryData = data?.items?.[0]
    if (!entryData) return <div />

    return <EmbeddedEntry {...entryData} {...rest} />
  } else {
    const targetId = node?.data?.target?.sys?.id
    const linkType = node?.data?.target?.sys?.linkType
    const entry = references?.find(({ id }) => id === targetId)

    if (!references?.length || !entry) return <div />
    return <EmbeddedEntry {...rest} {...entry} linkType={linkType} />
  }
}

export default EmbeddedEntryContainer
