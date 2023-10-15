function init(){

   const $= go.GraphObject.make;
   myDiagram = 
   new go.Diagram("myDiagramDiv",
   {
    "undoManager.isEnabled": true,
   })
}