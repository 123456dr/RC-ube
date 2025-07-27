# RC'ube
RC'ube == RC's Cube


## Devlog :
Version History:
### v1 : Implemented basic 3x3 cube creation.

    - v1.0 : create basic select func
        - When a cube is selected, the edge colors of the 9 cubes aligned with it along the X, Y, and Z axes are updated.  
    > This serves as a visual cue to indicate which cubes share the same axis planes with the selected one.
    
    - v1.1 : Updated the selection function to improve visibility. 
        - Replaced subtle edge coloring with three large colored frames.
        - Each frame covers the 9 cubes along one axis (X, Y, Z) that align with the selected cube.  
    > This provides a much clearer visual indication of selection across all three directions.
    
    - v1.2 : Fixed Z-fighting flickering issue & added mouse lock feature
        - Resolved flickering caused by overlapping transparent frames.
        - Introduced a "Mouse Lock" toggle button.  
    > Prevents accidental cube selection while rotating the camera, reducing unintended selections.

### v2 : 建立方塊共用面選擇功能 Add shared-face selection functionality

    - v2.0 : Create face selection logic & re-selection logic  
        - Added button: “Select Face / ReSelect”
        - When a cube is selected, the three axis-aligned planes shared with it are shown.
        - Hovering over a face highlights it.
        - Clicking a highlighted face locks that face and hides the other two.
        - Clicking "ReSelect" restores all three faces.
        - Only when the user cancel “MouseLocked” can they select a new cube and see its shared planes again.