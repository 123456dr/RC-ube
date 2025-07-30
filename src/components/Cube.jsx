import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from 'three'

//單一cube
function Cube({position, selectedCube, setSelectedCube, mouseLock, selectHover}) {

    const isSelected = selectedCube && //position.every((val, i) => val === selectedCube[i]);
        position[0] === selectedCube[0] &&
        position[1] === selectedCube[1] &&
        position[2] === selectedCube[2];

    
    const isSameFace = selectedCube &&
        (
            position[0] === selectedCube[0] ||
            position[1] === selectedCube[1] ||
            position[2] === selectedCube[2]
        );

    
    //const color = 'orange'//selected ? '#00ffff' : 'orange'
    let color = 'orange';
    const ref = useRef();
    
    const materials = [
        new THREE.MeshStandardMaterial({ color: 'hsla(10, 100%, 100%, 1.00)' }), // +X 白
        new THREE.MeshStandardMaterial({ color: 'hsla(50, 100%, 50%, 1.00)' }),  // -X 黃
        new THREE.MeshStandardMaterial({ color: '#a0bfff' }),                  // +Y 藍
        new THREE.MeshStandardMaterial({ color: '#98ff98' }),                  // -Y 綠
        new THREE.MeshStandardMaterial({ color: '#FF8800' }),                  // +Z 橘
        new THREE.MeshStandardMaterial({ color: 'rgba(255, 6, 6, 1)' })       // -Z 紅
    ];




    const handleClick = (e) => {
        if (mouseLock) return;
        e.stopPropagation();  //立刻停止 阻止事件冒泡點到透視cube
        setSelectedCube(isSelected ? null : position);
    }

    return(
        <mesh ref={ref} material={materials}
            renderOrder={1}
            position={position}
            onClick={handleClick}
            scale={isSelected ? 1.01 : 1}  //略放大
        >
            <boxGeometry args={[1,1,1]} />     {/* 立方體大小1x1x1 */}
            {/*<meshStandardMaterial 
                color={color} 
                emissive={isSelected ? 'yellow' : isSameFace && selectHover === null  ? "yellow" : 'black'} 
                emissiveIntensity={0.1}  
            /> {/ * 材質 顏色 光線效果 /emissive自體發光; emissiveveIntensity亮度(大亮)     ;  wireframe純線條 * /}
            */}
            
            <Edges
                scale={1.01}  //邊框放大
                threshold={15}  //二面角大於15度會顯示, 
                color={isSelected ? "white" :color}//isSelected ? "white" : isSameFace ? faceColor : color}
            />
        </mesh>
        
    )
}




function CubeCollect ({selectedCube, setSelectedCube, mouseLock, selectHover}){
    const offset = [-1.1, 0, 1.1]  //三個位置, 緊密:-1, 0, 1
    return ( 
        <>
            {offset.map((x) =>
                offset.map((y) =>
                    offset.map((z) =>(
                        <Cube 
                            key={`${x}${y}${z}`}
                            position={[x,y,z]}
                            selectedCube={selectedCube}
                            setSelectedCube={setSelectedCube}
                            mouseLock={mouseLock}
                            selectHover={selectHover}
                        />
                    ))
                )
            )}
        </>
    )

}
export default CubeCollect;