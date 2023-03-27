import { graphql } from 'gatsby'

export const assetBase = graphql`
  fragment assetBase on ContentfulAsset {
    id: contentful_id
    title
    description
    file {
      url
      contentType
    }
  }
`

export const basePage = graphql`
  fragment basePage on ContentfulPage {
    id: contentful_id
    title
    node_locale
    displayOnSites
    title
    slug
    ogImage {
      file {
        url
      }
      description
    }
    excerpt {
      excerpt
    }
  }
`
