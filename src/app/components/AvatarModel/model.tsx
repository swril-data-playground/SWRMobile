const MODEL_SIZE = 0.7;
const modelOBJ = {
  male: {
    type: "obj",
    name: "male",
    isometric: true,
    model: require("../../../models/male/male.obj"),
    material: require("../../../models/male/male.mtl"),
    scale: {
      x: MODEL_SIZE,
      y: MODEL_SIZE,
      z: MODEL_SIZE,
    },
    position: {
      x: 0,
      y: 0,
      z: 1,
    },
    animation: {
      rotation: {
        y: 0.02,
        x: 0.001,
      },
    },
  },
  female: {
    type: "obj",
    name: "female",
    isometric: true,
    model: require("../../../models/female/female.obj"),
    material: require("../../../models/female/female.mtl"),
    scale: {
      x: MODEL_SIZE,
      y: MODEL_SIZE,
      z: MODEL_SIZE,
    },
    position: {
      x: 0,
      y: 0,
      z: 1,
    },
    animation: {
      rotation: {
        y: 0.02,
        x: 0.001,
      },
    },
  },
};

export default modelOBJ;
