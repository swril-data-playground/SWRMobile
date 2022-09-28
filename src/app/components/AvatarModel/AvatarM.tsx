import { View, StyleSheet, Text } from "react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import { loadObjAsync, Renderer, THREE } from "expo-three";
import React, { useState } from "react";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
} from "three";
import modelOBJ from "./model";

const model = require("./models/male/male.obj")
const material = require("./models/male/male.mtl")

const loadModel = async function (item: any) {
  const texturesLength = item.textures?.length || 0;
  console.log(`[loadModel] -> Textures length: ${texturesLength}`);
  const textures: any = [];
  //   for (let i = 0; i < texturesLength; i++) {
  //     const texture = await loadTextureAsync({
  //       asset: item.textures[i].image,
  //     });
  //     if (item.type === "glb") {
  //       texture.flipY = false;
  //     }
  //     textures.push({ name: item.textures[i]?.name || "-", map: texture });
  //   }
  console.log(`[loadModel] -> Textures done loading`);

  let obj = null;
  if (item.type === "obj") {
    obj = await loadObjAsync({
		asset: model,
		mtlAsset: material ?? undefined,
    });
  }
  console.log(`[loadModel] -> Model done loading, adding textures now...`);

  if (texturesLength > 0) {
    if (texturesLength === 1) {
      obj.traverse(function (object: any) {
        if (object instanceof THREE.Mesh) {
          object.material.map = textures[0]?.map;
        }
      });
    } else {
      obj.traverse(function (object: any) {
        if (object instanceof THREE.Mesh) {
          // console.log(
          //   `[loadModel] -> Traverse object name: ${object.name}`,
          // );
          // console.log(object);
          const selected = textures?.find((x: any) => x.name === object.name);
          object.material.map = selected?.map;
        }
      });
    }
  }
  console.log(`[loadModel] -> Textures done applied...`);

  if (item.scale) {
    obj.scale.set(item.scale.x, item.scale.y, item.scale.z);
  }
  if (item.position) {
    obj.position.set(item.position.x, item.position.y, item.position.z);
  }
  if (item.rotation) {
    obj.rotation.x = item.rotation.x;
    obj.rotation.y = item.rotation.y;
    // obj.rotation.z = item.rotation.z;
  }
  return obj;
};

const onContextCreate = async (gl: ExpoWebGLRenderingContext, data: any) => {
  const { selected } = data;
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  const sceneColor = 0xabd2c3;
  // Create a WebGLRenderer without a DOM element
  const renderer = new Renderer({ gl, alpha: true }) as any;
  renderer?.setSize(width, height);
  renderer?.setClearColor(sceneColor, 0);

  const isModelArray = selected?.models && Array.isArray(selected.models);

  let camera: any;
  if (selected.isometric) {
    // use this if wan isometric view
    var aspect = width / height;
    var d = 10;
    camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, -10, 1000);
  } else {
    // use this if wan normal view
    camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
  }

  const scene = new Scene();

  const pointLight = new PointLight(0xffffff, 2, 1000, 1);
  pointLight.position.set(0, 30, 100);
  // scene.add(pointLight);

  // HemisphereLight - color feels nicer
  const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  // AmbientLight - add more brightness?
  const ambientLight = new AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);

  let models: any = [];

  if (isModelArray) {
    for (let i = 0; i < selected.models.length; i++) {
      const modelItem = selected.models[i];
      const model = await loadModel(modelItem);
      scene.add(model);
      models.push(model);
    }
  } else {
    const model = await loadModel(selected);
    scene.add(model);
    models.push(model);
  }

  function update() {
    if (isModelArray) {
      for (let i = 0; i < selected.models.length; i++) {
        if (models[i] && selected.models[i]?.animation) {
          if (selected.models[i].animation?.rotation?.x) {
            models[i].rotation.x += selected.models[i].animation?.rotation?.x;
          }
          if (selected.models[i].animation?.rotation?.y) {
            models[i].rotation.y += selected.models[i].animation?.rotation?.y;
          }
        }
      }
    } else {
      if (models[0] && selected?.animation) {
        if (selected.animation?.rotation?.x) {
          models[0].rotation.x += selected.animation?.rotation?.x;
        }
        if (selected.animation?.rotation?.y) {
          models[0].rotation.y += selected.animation?.rotation?.y;
        }
      }
    }
  }
  // Setup an animation loop
  const render = () => {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

const AvatarM = () => {
  const [selected, setSelected] = useState(modelOBJ.male);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {selected ? (
          <GLView
            style={{ flex: 1 }}
            onContextCreate={(gl: ExpoWebGLRenderingContext) => {
              onContextCreate(gl, { selected });
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AvatarM;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // paddingTop: 50,
    justifyContent: "center",
    // backgroundColor: "#abd2c3",
  },
});
