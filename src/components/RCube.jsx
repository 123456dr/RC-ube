import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";


//單一cube
function Cube({position, selectedCube, onSelectedCube}) {

    const isSelected = selectedCube && position.every((val, i) => val === selectedCube[i]);
    
    const color = 'orange'//selected ? '#00ffff' : 'orange'

    const handleClick = (e) => {
        e.stopPropagation();  //立刻停止 阻止事件冒泡點到透視cube
        onSelectedCube(position);
    }

    return(
        <mesh
            position={position}
            onClick={handleClick}
            scale={isSelected ? 1.01 : 1}  //略放大
        >
            <boxGeometry args={[1,1,1]} />     {/* 立方體大小1x1x1 */}
            <meshStandardMaterial 
                color={color} 
                emissive={isSelected ? 'yellow' : 'black'} 
                emissiveIntensity={0.1}  
            /> {/* 材質 顏色 光線效果 /emissive自體發光; emissiveveIntensity亮度(大亮)     ;  wireframe純線條 */}
            
            <Edges
                scale={1.01}  //邊框放大
                threshold={15}  //二面角大於15度會顯示, 
                color={isSelected ? "white" : color}
            />
        </mesh>
        
    )
}

function CubeCollect ({selectedCube, setSelectedCube}){
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
                            onSelectedCube={setSelectedCube}
                        />
                    ))
                )
            )}
        </>
    )

}




export default function RCube() {

    const [selectedCube, setSelectedCube] = useState(null);

    return (
        <Canvas camera={{ position: [3,3,3], fov: 75}}> {/* 初始相機角度(xxx往000)與距離, fov == 視野範圍 */}
            <ambientLight />     {/* 環境光 */}
            <pointLight position={[10, 10, 10]} />  {/* 光源 陰影 */}
            
            <CubeCollect 
                selectedCube={selectedCube}
                setSelectedCube={setSelectedCube}    
            />
            <OrbitControls />  {/* 滑鼠旋轉整個畫面 */}
        </Canvas>
    )
}