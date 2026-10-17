import ExploreView from '@/views/ExploreView'
import { pageMetadata } from '@/views/metadata'

export const metadata = pageMetadata('en', 'explore')

export default function Page() {
  return <ExploreView locale="en" />
}
