import DemoView from '@/views/DemoView'
import { pageMetadata } from '@/views/metadata'

export const metadata = pageMetadata('ur', 'demo')

export default function Page() {
  return <DemoView locale="ur" />
}
