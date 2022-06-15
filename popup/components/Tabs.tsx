import type { FunctionComponent } from 'react'
import { Link } from 'react-chrome-extension-router'
import Front from '../pages/front'
import List from '../pages/list'
import Schedule from '../pages/schedule'
import Settings from '../pages/settings'

const Tabs: FunctionComponent = () => {
  return (
    <div className="flex w-full bg-red-400 h-10 justify-between text-lg">
      <Link
        component={Front}
        props={{ message: 'I came from component front!' }}
      >
        <p>{'front'}</p>
      </Link>
      <Link component={List} props={{ message: 'I came from component list!' }}>
        <p>{'list'}</p>
      </Link>
      <Link
        component={Schedule}
        props={{ message: 'I came from component sched!' }}
      >
        <p>{'sched'}</p>
      </Link>
      <Link
        component={Settings}
        props={{ message: 'I came from component setti!' }}
      >
        <p>{'setti'}</p>
      </Link>{' '}
    </div>
  )
}

export default Tabs
