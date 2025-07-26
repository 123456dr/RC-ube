//改index.html 路徑<base href="/RC-ube/web/v1.0/">
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci"; //npm install react-icons

//單一cube
function Cube({position, selectedCube, setSelectedCube, mouseLock}) {

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
        if (mouseLock) return;
        e.stopPropagation();  //立刻停止 阻止事件冒泡點到透視cube
        setSelectedCube(isSelected ? null : position);
    }

    return(
        <mesh
            renderOrder={1}
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
                color={isSelected ? "white" :color}//isSelected ? "white" : isSameFace ? faceColor : color}
            />
        </mesh>
        
    )
}


function FaceHint({ selectedCube }){

    if (!selectedCube) return null;

    const faces = [];
    
    const size = 3.3;
    const thickness = 1;

    faces.push(
        <mesh key="x" position={[selectedCube[0], 0, 0]} renderOrder={10}>  {/* renderoOrder繪製順序 */}
            <boxGeometry args={[thickness, size, size]} />
            <meshBasicMaterial color="red" transparent opacity={0.3} depthWrite={false} polygonOffset polygonOffsetFactor={-1}/> {/* depthWrite={false}不寫入z-buffer(深度緩衝區) */}
            <Edges scale={1.01} threshold={15} color="red" />
        </mesh>
    );

    faces.push(
        <mesh key="y" position={[0, selectedCube[1], 0]} renderOrder={11}>
            <boxGeometry args={[size, thickness, size]} />
            <meshBasicMaterial color="green" transparent opacity={0.3} depthWrite={false} polygonOffset polygonOffsetFactor={-1}/>
            <Edges scale={1.01} threshold={15} color="green" />
        </mesh>
    );

    faces.push(
        <mesh key="z" position={[0, 0, selectedCube[2]]} renderOrder={12}>
            <boxGeometry args={[size, size, thickness]} />
            <meshBasicMaterial color="blue" transparent opacity={0.3} depthWrite={false} polygonOffset polygonOffsetFactor={-1}/>
            <Edges scale={1.01} threshold={15} color="blue" />
        </mesh>
    );

    return <>{faces}</>;

}



function CubeCollect ({selectedCube, setSelectedCube, mouseLock}){
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
                        />
                    ))
                )
            )}
        </>
    )

}




export default function RCube() {

    const [selectedCube, setSelectedCube] = useState(null);
    const [mouseLock, setMouseLock] = useState(false);

    return (
     <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        <button onClick={() => setMouseLock(!mouseLock)} style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000, padding: "6px 12px" }}>
            { mouseLock ? (<> MouseLocked <CiLock /> </> ) : ( <> MouseFree <CiUnlock /> </> )}

        </button>
        
      
        <Canvas camera={{ position: [3,3,3], fov: 75}}> {/* 初始相機角度(xxx往000)與距離, fov == 視野範圍 */}
            <ambientLight />     {/* 環境光 */}
            <pointLight position={[10, 10, 10]} />  {/* 光源 陰影 */}
            
            <CubeCollect 
                selectedCube={ selectedCube}
                setSelectedCube={setSelectedCube}
                mouseLock={mouseLock}
            />

            <FaceHint selectedCube={selectedCube} />

            <OrbitControls />  {/* 滑鼠旋轉整個畫面 */}
        </Canvas>
      

     </div>
    )
}