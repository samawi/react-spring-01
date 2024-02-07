import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Select } from '@react-three/postprocessing'

export default function Box(props) {
  const ref = useRef()

  const [hovered, setHover] = useState(false)
  const [rotate, setRotate] = useState(false)
  console.log('Hover : ', hovered)

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
      <mesh
        {...props}
        ref={ref}
        onPointerOver={() => {
          setHover(true)
        }}
        onPointerOut={() => setHover(false)}
        onPointerDown={() => {
          setRotate(!rotate)
        }}>
        <boxGeometry />
        <meshBasicMaterial color={0x00ff00} wireframe />
      </mesh>
    </Select>
  )
}
