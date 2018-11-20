import { formatSearchResultProducts, getProductPrice } from './utils/formatHelper'

// TODO: get actual currency
const currency = 'BRL'

const trackCategoryPage = (page: string, e: Event) =>
  fbq('track', 'ViewContent', {
    ...formatSearchResultProducts(e.data.products),
    content_category: page,
    content_type: 'product_group',
    currency,
  })

window.addEventListener('message', e => {
  switch (e.data.eventName) {
    case 'vtex:categoryView': {
      trackCategoryPage('category', e)
      break
    }
    case 'vtex:departmentView': {
      trackCategoryPage('department', e)
      break
    }
    case 'vtex:internalSiteSearchView': {
      fbq('track', 'Search', formatSearchResultProducts(e.data.products))
      break
    }
    case 'vtex:productView': {
      const { product: { productName, productId } } = e.data

      fbq('track', 'ViewContent', {
        content_category: 'product',
        content_ids: [productId],
        content_name: name,
        content_type: 'product',
        currency,
        value: getProductPrice(e.data.product),
      })
      break
    }
    default:
      break
  }
})
