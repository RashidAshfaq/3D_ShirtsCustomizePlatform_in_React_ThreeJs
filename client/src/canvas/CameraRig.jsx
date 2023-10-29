import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { easing } from "maath";
import state from "../store";
import { useRef } from "react";

const CameraRig = ( {children} ) => {
    const snap = useSnapshot(state);
    const group = useRef();
    
    useFrame((state, delta) => {
        // set the initial position of the model
        const isBreakPoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;
        let targetPosition = [-0.4, 0, 2];
        if(state.intro){
            if(isBreakPoint) targetPosition = [0,0,2];
            if(isMobile) targetPosition = [0,0.2,2.5];
        } else {
            if(isMobile) targetPosition = [0,0.2,2.5];
            else targetPosition = [0,0,2];
        }
        
        // set the model camera position 
        easing.damp3(state.camera.position, targetPosition, 0.25, delta);
        // set the smoothly rotation
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    })
  return (
    <group ref={group}>{children}</group>
  )
}

export default CameraRig