import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

export default function Box(props) {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [active, setActive] = useState(0)
  const [clicked, setClicked] = useState(false)

  const { position, rotation } = useSpring({
    position: clicked ? 2 : 0, // Toggle between two positions
    rotation: clicked ? [0, Math.PI / 2, 0] : [0, 0, 0],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  useEffect(() => {
    console.log('Box created', ref.current.name)
  }, [])

  return (
    <Select enabled={hovered}>
      <a.mesh
        position-z={position}
        rotation={rotation}
        {...props}
        onClick={() => setClicked(!clicked)} // Toggle the clicked state
        ref={ref}
        onPointerOver={() => {
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}>
        <boxGeometry />
        <meshStandardMaterial
          color={0x00ff00}
          wireframe={false}
          flatShading
          opacity={0.5}
          transparent
        />
      </a.mesh>
    </Select>
  )
}
