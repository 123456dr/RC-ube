import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";

function FaceHint({ selectedCube ,faceHover, setFaceHover, selectHover, setSelectHover ,mouseLock, setMouseLock}){

    if (!selectedCube) return null;

    const faces = [];
    const size = 3.3;
    const thickness = 1;

    const handleHover = (face) => (e) => {
        if(selectHover !== null) return;
        e.stopPropagation();  //立刻停止 阻止事件冒泡點到透視cube
        setFaceHover(face)
    }
    const handleOut = (face) => () => {
        if (selectHover !== null && selectHover !== face) return;
        setFaceHover(null);
    }
    
    faces.push(
        <mesh 
            key="x" 
            position={[selectedCube[0], 0, 0]} 
            renderOrder={10}  
            onPointerOver={handleHover("x")} 
            onPointerOut={handleOut("x")}
            onClick={() =>{
                if(!mouseLock)return;
                if (selectHover === null) {
                    setMouseLock(true);
                    setSelectHover("x");
                    setFaceHover("x");
                    e.stopPropagation();
                }
            }}
        >  {/* renderoOrder繪製順序 */}
            <boxGeometry args={[thickness, size, size]} />
            <meshBasicMaterial 
                color="red" 
                transparent 
                opacity={ faceHover==="x" || selectHover=== "x" ? 0.6 :selectHover!==null ? 0 : 0.4} 
                depthWrite={false}  
                polygonOffset 
                polygonOffsetFactor={-1}
            /> {/* depthWrite={false}不寫入z-buffer(深度緩衝區) */}
            {(faceHover === "x" || selectHover === "x") && (
                <Edges scale={1.01} threshold={15} color="red" />
            )}
        </mesh>
    );

    faces.push(
        <mesh 
            key="y" 
            position={[0, selectedCube[1], 0]} 
            renderOrder={11} 
            onPointerOver={handleHover("y")} 
            onPointerOut={handleOut("y")}
            onClick={() => {
                if(!mouseLock)return;
                if (selectHover === null) {
                    setMouseLock(true);
                    setSelectHover("y");
                    setFaceHover("y");
                    e.stopPropagation();
                }
            }}
        >
            <boxGeometry args={[size, thickness, size]} />
            <meshBasicMaterial 
                color="green" 
                transparent 
                opacity={ faceHover==="y" || selectHover=== "y" ? 0.7 :selectHover!==null ? 0 : 0.4}
                depthWrite={false} 
                polygonOffset 
                polygonOffsetFactor={-1}
            />
            {(faceHover === "y" || selectHover === "y") && (
                <Edges scale={1.01} threshold={15} color="green"/>
            )}
        </mesh>
    );

    faces.push(
        <mesh 
            key="z" 
            position={[0, 0, selectedCube[2]]} 
            renderOrder={12} 
            onPointerOver={handleHover("z")} 
            onPointerOut={handleOut("z")}
            onClick={() => {
                if(!mouseLock)return;
                if (selectHover === null) {
                    setMouseLock(true);
                    setSelectHover("z");
                    setFaceHover("z");
                    e.stopPropagation();
                }
            }}
        >
            <boxGeometry args={[size, size, thickness]} />
            <meshBasicMaterial 
                color="blue" 
                transparent 
                opacity={ faceHover==="z" || selectHover=== "z" ? 0.5 :selectHover!==null ? 0 : 0.3} 
                depthWrite={false} 
                polygonOffset 
                polygonOffsetFactor={-1}
            />
            {(faceHover === "z" || selectHover === "z") && (
            <Edges scale={1.01} threshold={15} color="blue" />
            )}
        </mesh>
    );

    return <>{faces}</>;

}
export default FaceHint;