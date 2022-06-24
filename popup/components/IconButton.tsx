import { Clock, GearSix, Rows, House } from 'phosphor-react'
import * as React from 'react'
import { useHover } from '~hooks/useHover'

const iconSize = 24

interface IIconButtonProps {
  id: string
  selectedTabId: string
}

export const IconButton: React.FunctionComponent<IIconButtonProps> = ({
  id,
  selectedTabId,
}: {
  id: string
  selectedTabId: string
}) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  console.log('selectedTab', selectedTabId)
  const getIcon = React.useMemo(() => {
    switch (id) {
      case 'front':
        return (
          <House
            color="white"
            size={iconSize}
            weight={selectedTabId === 'front' ? 'fill' : 'regular'}
          />
        )
      case 'list':
        return (
          <Rows
            color="white"
            size={iconSize}
            weight={selectedTabId === 'list' ? 'fill' : 'regular'}
          />
        )
      case 'schedule':
        return (
          <Clock
            color="white"
            size={iconSize}
            weight={selectedTabId === 'schedule' ? 'fill' : 'regular'}
          />
        )

      case 'settings':
        return (
          <GearSix
            color="white"
            size={iconSize}
            weight={selectedTabId === 'settings' ? 'fill' : 'regular'}
          />
        )

      default:
        break
    }

    return <></>
  }, [id, selectedTabId, isHovered])

  return (
    <div className="p-5" ref={hoverRef}>
      {getIcon}
    </div>
  )
}
