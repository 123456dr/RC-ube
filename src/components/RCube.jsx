//改index.html 路徑<base href="/RC-ube/web/v1.0/">
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci"; //npm install react-icons
import "../css/RCube.css"

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
                emissive={isSelected ? 'yellow' : isSameFace && selectHover === null  ? "yellow" : 'black'} 
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




export default function RCube() {

    const [selectedCube, setSelectedCube] = useState(null);
    const [mouseLock, setMouseLock] = useState(false);
    const [faceHover, setFaceHover] = useState(false);
    const [selectHover, setSelectHover] = useState(null);

    return (
     <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>  {/* vm == viewport width*/}
        <button onClick={() => { if (mouseLock && selectHover !== null) {setMouseLock(false); setSelectHover(null); setFaceHover(null);  } else {  setMouseLock(!mouseLock);  } }}
            className="ButtonSelectCube"style={{ top: "10px" }}>
            { mouseLock ? (<> MouseLocked <CiLock /> </> ) : ( <> Select Cube <CiUnlock /> </> )}{/* absolute 文件流微調不改變其他物件位置 */}
        </button>
        
        <button onClick={() => {if(selectedCube===null){alert("Please select one cube!"); return;}  if(selectHover!==null){setSelectHover(null); setFaceHover(null);} else {setMouseLock(true);}}} 
            className="ButtonSelectCube" style={{ top: "50px" }}
        >
            { selectHover !== null ? "ReSelect" : mouseLock ? "NowSelect Face"  : selectedCube ? "Click Me to select face":""}
        </button>

      
        <Canvas camera={{ position: [3,3,3], fov: 75}}> {/* 初始相機角度(xxx往000)與距離, fov == 視野範圍 */}
            <ambientLight />     {/* 環境光 */}
            <pointLight position={[10, 10, 10]} />  {/* 光源 陰影 */}
            
            <CubeCollect 
                selectedCube={ selectedCube}
                setSelectedCube={setSelectedCube}
                mouseLock={mouseLock}
                selectHover={selectHover}
            />

            <FaceHint 
                selectedCube={selectedCube} 
                faceHover={faceHover}
                setFaceHover={setFaceHover}
                selectHover={selectHover}
                setSelectHover={setSelectHover}
                mouseLock={mouseLock}
                setMouseLock={setMouseLock}
            />

            <OrbitControls />  {/* 滑鼠旋轉整個畫面 */}
        </Canvas>
      

     </div>
    )
}