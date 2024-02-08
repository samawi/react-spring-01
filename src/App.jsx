import { Canvas } from '@react-three/fiber'
import Box from './Box'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="white"
            edgeStrength={100}
            width={1000}
          />
        </EffectComposer>
        <Box position={[-0.75, 0, 0]} name="A" />
        <Box position={[0.75, 0, 0]} name="B" />
      </Selection>
      <OrbitControls />
      <axesHelper args={[5]} />
      <Lights />
    </Canvas>
  )
}
