const debugger3d = {
    doNotBuild: null,
    meshDirty: false,
};

// Sample input paths in {x, y} format
const samplePaths = [
    [{ x: 10, y: 20 }, { x: 30, y: 40 }],
    [{ x: 50, y: 60 }, { x: 70, y: 80 }]
];

// ====== ASSISTANT 1 RESPONSE ======
function testAssistant1(paths) {
    debugger3d.doNotBuild = null;
    debugger3d.meshDirty = false;

    // Assistant 1 code
    debugger3d.doNotBuild = paths;
    debugger3d.meshDirty = true;

    console.log("Assistant 1 Result:");
    console.log("doNotBuild:", debugger3d.doNotBuild);
    console.log("meshDirty:", debugger3d.meshDirty);
}

// Run the test
testAssistant1(samplePaths);