import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { animated } from '@react-spring/three'

export default function Box(props) {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [active, setActive] = useState(0)
  const [clicked, setClicked] = useState(false)

  const { spring } = useSpring({
    spring: active,
    // location: clicked ? [0, 0, 0] : [10, 0, 0],
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
  })

  const scale = spring.to([0, 1], [1, 1.5])
  const rotation = spring.to([0, 1], [0, Math.PI / 2])

  useEffect(() => {
    console.log('Box created', ref.current.name)
  }, [])

  useFrame((state, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
    }
  })


  return (
    <Select enabled={hovered}>
      <a.mesh
        rotation-x={rotation}
        scale-x={scale}
        scale-z={scale}
        position={spring.location}
        onClick={() => setActive(Number(!active))}
        {...props}
        ref={ref}
        onPointerOver={() => {
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}
        // onPointerDown={() => {
        //   setRotate(!rotate)
        // }}
      >
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
