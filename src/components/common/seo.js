import { Helmet } from 'react-helmet'

const SEO = ({ title = 'Default' }) => {
  const metaTitle = title

  return (
    <Helmet
      titleTemplate={metaTitle}
      defaultTitle={metaTitle}
      title={metaTitle}
    >
      <html lang={'en'} />
    </Helmet>
  )
}

export default SEO
