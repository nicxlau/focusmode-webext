import { Clock, GearSix, Rows, House } from 'phosphor-react'
import * as React from 'react'
import { useHover } from '~hooks/useHover'

const iconSize = 24

export const IconButton = ({
  id,
  selectedTabId,
}: {
  id: string
  selectedTabId: string
}) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  const getIcon = React.useMemo(() => {
    switch (id) {
      case 'front':
        return (
          <House
            size={iconSize}
            weight={selectedTabId === 'front' || isHovered ? 'fill' : 'regular'}
            color={'white'}
          />
        )
      case 'list':
        return (
          <Rows
            size={iconSize}
            weight={selectedTabId === 'list' || isHovered ? 'fill' : 'regular'}
            color={'white'}
          />
        )
      case 'schedule':
        return (
          <Clock
            size={iconSize}
            weight={
              selectedTabId === 'schedule' || isHovered ? 'fill' : 'regular'
            }
            color={'white'}
          />
        )

      case 'settings':
        return (
          <GearSix
            size={iconSize}
            weight={
              selectedTabId === 'settings' || isHovered ? 'fill' : 'regular'
            }
            color={'white'}
          />
        )

      default:
        break
    }
  }, [id, selectedTabId, isHovered])

  return (
    <div className="p-5" ref={hoverRef}>
      {getIcon}
    </div>
  )
}
