import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";


//單一cube
function Cube({position, selectedCube, setSelectedCube}) {

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
    let faceColor = null;
    if(isSameFace) {
        if(position[0] === selectedCube[0]) faceColor = "red";
        else if(position[1] === selectedCube[1]) faceColor = "green";
        else if(position[2] === selectedCube[2]) faceColor = "blue";
    }


    const handleClick = (e) => {
        e.stopPropagation();  //立刻停止 阻止事件冒泡點到透視cube
        setSelectedCube(isSelected ? null : position);
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
                emissive={isSelected ? 'yellow' : isSameFace? "yellow" : 'black'} 
                emissiveIntensity={0.1}  
            /> {/* 材質 顏色 光線效果 /emissive自體發光; emissiveveIntensity亮度(大亮)     ;  wireframe純線條 */}
            
            <Edges
                scale={1.01}  //邊框放大
                threshold={15}  //二面角大於15度會顯示, 
                color={isSelected ? "white" : isSameFace ? faceColor : color}
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
                            setSelectedCube={setSelectedCube}
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