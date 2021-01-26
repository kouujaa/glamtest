import React from 'react'
import ContentLoader from 'react-content-loader'

const CatalogMagic = ({
  width = 966,
  heading = { width: 500, height: 24 },
  row = 2,
  column = 3,
  padding = 12,
  borderRadius = 4,
  ...props
}) => {
  const list = []

  let height

  for (let i = 1; i <= row; i++) {
    for (let j = 0; j < column; j++) {
      const itemWidth = (width - padding * (column + 1)) / column

      const x = padding + j * (itemWidth + padding)

      const height1 = itemWidth

      const height2 = 20

      const height3 = 20

      const space =
        padding + height1 + (padding / 2 + height2) + height3 + padding * 4

      const y1 = padding + heading.height + padding * 2 + space * (i - 1)

      const y2 = y1 + padding + height1

      const y3 = y2 + padding / 2 + height2

      const k = i

      list.push(
        <>
          <rect
            x={x}
            y={y1}
            rx={borderRadius}
            ry={borderRadius}
            width={itemWidth}
            height={height1}
          />
          <rect  y={y2} rx={0} ry={0} width={itemWidth} height={height2} key={k}/>
          <rect
            x={x}
            y={y3}
            rx={0}
            ry={0}
            width={itemWidth * 0.6}
            height={height3}
          />
        </>
      )

      if (i === row) {
        height = y3 + height3
      }
    }
  }

  return (
  <div>
    <ContentLoader 
      style={{ paddingTop: "50px", width: "-webkit-fill-available" }}
      speed={2}
      width={1110}
      height={300}
      viewBox="0 0 1110 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="52" y="337" rx="0" ry="0" width="249" height="239" /> 
      <rect x="377" y="333" rx="0" ry="0" width="240" height="190" /> 
      <rect x="23" y="127" rx="0" ry="0" width="173" height="165" /> 
      <rect x="247" y="130" rx="0" ry="0" width="173" height="163" /> 
      <rect x="466" y="135" rx="0" ry="0" width="173" height="190" /> 
      <rect x="687" y="139" rx="0" ry="0" width="173" height="170" /> 
      <rect x="943" y="46" rx="0" ry="0" width="3" height="1" /> 
      <rect x="904" y="140" rx="0" ry="0" width="173" height="194" /> 
      <rect x="421" y="26" rx="0" ry="0" width="261" height="17" /> 
      <rect x="366" y="62" rx="0" ry="0" width="356" height="14" />
    </ContentLoader>
    <ContentLoader
      style={{ paddingTop: "50px", width: "-webkit-fill-available" }}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      speed={2}
      {...props}
    >
      {heading && (
        <rect
          x={padding}
          y={padding}
          rx={0}
          ry={0}
          width={heading.width}
          height={heading.height}
        />
      )}
      {list}
    </ContentLoader>
    </div>
  )
}

CatalogMagic.metadata = {
  name: 'I am Doong - I come from Việt Nam',
  github: 'toiladoong',
  description: 'CatalogMagic',
  filename: 'CatalogMagic',
}

export default CatalogMagic
