# RC'ube
RC'ube == RC's Cube


## Devlog :
Version History:
### v1 : Implemented basic 3x3 cube creation.

    - v1.0  feat(select): create basic select func
        - When a cube is selected, the edge colors of the 9 cubes aligned with it along the X, Y, and Z axes are updated.  
    > This serves as a visual cue to indicate which cubes share the same axis planes with the selected one.
    
    - v1.1  refactor(select): Updated the selection function to improve visibility. 
        - Replaced subtle edge coloring with three large colored frames.
        - Each frame covers the 9 cubes along one axis (X, Y, Z) that align with the selected cube.  
    > This provides a much clearer visual indication of selection across all three directions.
    
    - v1.2.1  fix(z-fighting): Fixed Z-fighting flickering issue 
        - Resolved flickering caused by overlapping transparent frames.

    - v1.2.2  feat(button_mouselock): added mouse lock feature
        - Introduced a "Mouse Lock" toggle button.  
        - Prevents accidental cube selection while rotating the camera.
        - User must unlock to select a new cube.

### v2 : 建立方塊共用面選擇功能 Add shared-face selection functionality

    - v2.0.1  feat(face-select): Add face selection logic 
        - When a cube is selected, the three axis-aligned planes shared with it are shown.
        - Hovering over a face highlights it.
        - Clicking a highlighted face locks that face and hides the other two.
        - Only when the user cancel “MouseLocked” can they select a new cube and see its shared planes again.
    
    - v2.0.2 feat(re-selection):  
        - Added button: “Select Face / ReSelect”
        - Clicking "ReSelect" restores all three faces.

    - v2.0.3 style(3x3 cube): add responsive logic for initial camera setup

    - v2.1 style(cubes' color): Initialize the six face colors (white, yellow, blue, green, orange, red)









<!--
# RC'ube
RC'ube == RC's Cube


## Devlog :
Version History:
### v1 : Implemented basic 3x3 cube creation.

📌 v1.0 : create basic select func
- When a cube is selected, the edge colors of the 9 cubes aligned with it along the X, Y, and Z axes are updated.  
> This serves as a visual cue to indicate which cubes share the same axis planes with the selected one.
    
📌 v1.1 : Updated the selection function to improve visibility. 
- Replaced subtle edge coloring with three large colored frames.
- Each frame covers the 9 cubes along one axis (X, Y, Z) that align with the selected cube.  
> This provides a much clearer visual indication of selection across all three directions.
    
📌 v1.2 : Fixed Z-fighting flickering issue & added mouse lock feature
- Resolved flickering caused by overlapping transparent frames.
- Introduced a "Mouse Lock" toggle button.  
> Prevents accidental cube selection while rotating the camera, reducing unintended selections.

### v2 : 建立方塊共用面選擇功能 Add shared-face selection functionality

📌 v2.0 : Create face selection logic & re-selection logic  
- Added button: “Select Face / ReSelect”
- When a cube is selected, the three axis-aligned planes shared with it are shown.
- Hovering over a face highlights it.
- Clicking a highlighted face locks that face and hides the other two.
- Clicking "ReSelect" restores all three faces.
- Only when the user cancel “MouseLocked” can they select a new cube and see its shared planes again.
-->