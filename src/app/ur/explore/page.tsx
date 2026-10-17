import ExploreView from '@/views/ExploreView'
import { pageMetadata } from '@/views/metadata'

export const metadata = pageMetadata('ur', 'explore')

export default function Page() {
  return <ExploreView locale="ur" />
}
