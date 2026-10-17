import HomeView from '@/views/HomeView'
import { pageMetadata } from '@/views/metadata'

export const metadata = pageMetadata('ur', 'home')

export default function Page() {
  return <HomeView locale="ur" />
}
