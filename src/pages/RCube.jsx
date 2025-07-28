//改index.html 路徑<base href="/RC-ube/web/v1.0/">
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Edges } from "@react-three/drei";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci"; //npm install react-icons
import "../css/RCube.css";
import CubeCollect from "../components/Cube.jsx";
import FaceHint from "../components/FaceHint.jsx";
 



export default function RCube() {

    const [selectedCube, setSelectedCube] = useState(null);
    const [mouseLock, setMouseLock] = useState(false);
    const [faceHover, setFaceHover] = useState(false);
    const [selectHover, setSelectHover] = useState(null);
    const fov = window.innerWidth < 336 ? 100 : 75

    return (
     <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>  {/* vm == viewport width*/}
        <button onClick={() => {if(selectedCube===null){alert("Please select one cube!"); return;} if (mouseLock && selectHover !== null) {setMouseLock(false); setSelectHover(null); setFaceHover(null);  } else {  setMouseLock(!mouseLock);  } }}
            className="ButtonSelectCube"style={{ top: "10px" }}>
            { mouseLock ? (<> Cancel MouseLocked <CiLock /> </> ) : ( <> MouseLocked <CiUnlock /> </> )}{/* absolute 文件流微調不改變其他物件位置 */}
        </button>
        
        <button onClick={() => {if(selectedCube===null){alert("Please select one cube!"); return;}  if(selectHover!==null){setSelectHover(null); setFaceHover(null);} else {setMouseLock(true);}}} 
            className="ButtonSelectCube" style={{ top: "50px" }}
        >
            { selectHover !== null ? "ReSelect" : mouseLock ? "NowSelect Face"  : selectedCube ? "Click Me to select face":""}
        </button>

      
        <Canvas camera={{ position: [3,3,3], fov}}> {/* 初始相機角度(xxx往000)與距離, fov == 視野範圍 */}
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

