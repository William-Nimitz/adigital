// import { isPreviewPage, formatPreviewSlug } from '@utils/preview'

export const handleFindProductShopifyEntry = ({ shopifyProducts, id }) => {
  return shopifyProducts?.find(
    (product) => product.storefrontId === 'gid://shopify/Product/' + id
  )
}

export const handleShopifyProductTranslations = (
  shopifyProducts,
  shopifyProductTranslations
) => {
  const translations = shopifyProductTranslations?.reduce((acc, { node }) => {
    acc[node?.storefrontId] = node
    return acc
  }, {})

  return shopifyProducts?.map((product) => {
    const translation = translations[product?.storefrontId]
    return {
      ...product,
      ...translation,
    }
  })
}
export const isSSR = () => typeof window === 'undefined'

export const getUrlQueryParams = () => {
  if (isSSR()) return {}
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(params.entries())
}
export const nodeLocaleToEnglishLanguage = {
  'en-US': 'American English',
  'fr-CA': 'French',
  'es-MX': 'Spanish',
}

export const shouldDisplayOnSites = (entry, locale) =>
  entry?.displayOnSites.includes(nodeLocaleToEnglishLanguage[locale])

export const trunc = (str, len = 100) => {
  if (typeof str !== 'string') {
    return ''
  }
  if (str.length <= len) {
    return str
  }
  return str.substr(0, len - 1) + '...'
}

export const handleRedirect = ({ entryData, redirects = [] }) => {
  const redirect = redirects?.find(
    ({ fromPath }) => fromPath === `/${entryData?.originalSlug}`
  )
  const slugsToBypassRedirect = ['home']
  const bypassRedirect = slugsToBypassRedirect?.includes(
    entryData?.originalSlug
  )

  if (redirect && !bypassRedirect && !isSSR()) {
    window.location.replace(redirect?.toUrl)
  }
}

export const isEmailValid = (email) => {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

export const parseUrlToSlugAndHref = (url) => {
  const href = url?.match(/^(http|https|mailto|tel):\/\//) ? url : null
  const formattedSlug = url?.match(/^\/.+/) ? url.slice(1) : url
  const slug = href ? null : formattedSlug

  return [slug, href]
}

export const handleScrollToFirstPreorderSection = (event) => {
  if (event) event.preventDefault()
  const preOrderSection = document.querySelector('.product-buy-now-show-case')

  preOrderSection?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

  // pre-order event
  typeof window !== 'undefined' &&
    window.gtag &&
    window.gtag('event', 'pre_order_button_click', {
      event_category: 'Button',
      event_label: 'Preorder button',
    })
}

export const isExternalURL = (url) => {
  const domain = (url) =>
    url?.replace('http://', '')?.replace('https://', '')?.split('/')[0]
  return (
    typeof window !== 'undefined' &&
    domain(window?.location.href) !== domain(url)
  )
}

export const parseQueryString = (query, queryVariable) => {
  const variables = query.split('&')
  for (let i = 0; i < variables.length; i++) {
    let pair = variables[i].split('=')

    if (decodeURIComponent(pair[0]) === queryVariable) {
      return decodeURIComponent(pair[1])
    }
  }
}

export const sanitizeAndAddYoutubeThumbnailUrls = (youtubeVideoUrls) =>
  youtubeVideoUrls?.map((url) => {
    const queryParams = url?.split('?')[1]
    const videoId = parseQueryString(queryParams, 'v')

    return {
      id: videoId,
      url: 'https://www.youtube.com/embed/' + videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    }
  })

export const formattedLinkType = (type) => {
  if (type === 'ContentfulPage' || type === 'page') {
    return 'page'
  } else if (type === 'ContentfulPost' || type === 'post') {
    return 'post'
  } else if (type === 'ContentfulProductsPage' || type === 'productsPage') {
    return 'productsPage'
  } else if (type === 'ContentfulProduct' || type === 'product') {
    return 'product'
  } else {
    return 'url'
  }
}

export const requestService = () => {}
// export const getUrl = (type, target) => {
//   if (type === 'page' || type === 'post' || type === 'productsPage') {
//     return !isPreviewPage()
//       ? target?.slug === 'home'
//         ? '/'
//         : target?.slug
//       : formatPreviewSlug(target?.id, type)
//   } else if (type === 'url') {
//     return target?.url
//   } else if (type === 'product') {
//     return !isPreviewPage()
//       ? target?.parentSlug + '/' + target?.slug
//       : formatPreviewSlug(target?.id, type)
//   }
// }
