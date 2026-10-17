import DemoView from '@/views/DemoView'
import { pageMetadata } from '@/views/metadata'

export const metadata = pageMetadata('en', 'demo')

export default function Page() {
  return <DemoView locale="en" />
}
