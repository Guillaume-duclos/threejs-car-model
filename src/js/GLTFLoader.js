import*as THREE from"three";THREE.GLTFLoader=function(){function e(e){THREE.Loader.call(this,e),this.dracoLoader=null,this.ddsLoader=null}function t(){var e={};return{get:function(t){return e[t]},add:function(t,r){e[t]=r},remove:function(t){delete e[t]},removeAll:function(){e={}}}}e.prototype=Object.assign(Object.create(THREE.Loader.prototype),{constructor:e,load:function(e,t,r,a){var s,n=this;s=""!==this.resourcePath?this.resourcePath:""!==this.path?this.path:THREE.LoaderUtils.extractUrlBase(e),n.manager.itemStart(e);var i=function(t){a?a(t):console.error(t),n.manager.itemError(e),n.manager.itemEnd(e)},o=new THREE.FileLoader(n.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),"use-credentials"===n.crossOrigin&&o.setWithCredentials(!0),o.load(e,function(r){try{n.parse(r,s,function(r){t(r),n.manager.itemEnd(e)},i)}catch(e){i(e)}},r,i)},setDRACOLoader:function(e){return this.dracoLoader=e,this},setDDSLoader:function(e){return this.ddsLoader=e,this},parse:function(e,t,o,l){var d,f={};if("string"==typeof e)d=e;else if(THREE.LoaderUtils.decodeText(new Uint8Array(e,0,4))===i){try{f[r.KHR_BINARY_GLTF]=new u(e)}catch(e){return void(l&&l(e))}d=f[r.KHR_BINARY_GLTF].content}else d=THREE.LoaderUtils.decodeText(new Uint8Array(e));var E=JSON.parse(d);if(void 0===E.asset||E.asset.version[0]<2)l&&l(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));else{if(E.extensionsUsed)for(var g=0;g<E.extensionsUsed.length;++g){var T=E.extensionsUsed[g],v=E.extensionsRequired||[];switch(T){case r.KHR_LIGHTS_PUNCTUAL:f[T]=new s(E);break;case r.KHR_MATERIALS_UNLIT:f[T]=new n;break;case r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:f[T]=new h;break;case r.KHR_DRACO_MESH_COMPRESSION:f[T]=new c(E,this.dracoLoader);break;case r.MSFT_TEXTURE_DDS:f[T]=new a(this.ddsLoader);break;case r.KHR_TEXTURE_TRANSFORM:f[T]=new p;break;case r.KHR_MESH_QUANTIZATION:f[T]=new m;break;default:v.indexOf(T)>=0&&console.warn('THREE.GLTFLoader: Unknown extension "'+T+'".')}}new G(E,f,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager}).parse(o,l)}}});var r={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function a(e){if(!e)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader");this.name=r.MSFT_TEXTURE_DDS,this.ddsLoader=e}function s(e){this.name=r.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[r.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}function n(){this.name=r.KHR_MATERIALS_UNLIT}s.prototype.loadLight=function(e){var t,r=this.lightDefs[e],a=new THREE.Color(16777215);void 0!==r.color&&a.fromArray(r.color);var s=void 0!==r.range?r.range:0;switch(r.type){case"directional":(t=new THREE.DirectionalLight(a)).target.position.set(0,0,-1),t.add(t.target);break;case"point":(t=new THREE.PointLight(a)).distance=s;break;case"spot":(t=new THREE.SpotLight(a)).distance=s,r.spot=r.spot||{},r.spot.innerConeAngle=void 0!==r.spot.innerConeAngle?r.spot.innerConeAngle:0,r.spot.outerConeAngle=void 0!==r.spot.outerConeAngle?r.spot.outerConeAngle:Math.PI/4,t.angle=r.spot.outerConeAngle,t.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}return t.position.set(0,0,0),t.decay=2,void 0!==r.intensity&&(t.intensity=r.intensity),t.name=r.name||"light_"+e,Promise.resolve(t)},n.prototype.getMaterialType=function(){return THREE.MeshBasicMaterial},n.prototype.extendParams=function(e,t,r){var a=[];e.color=new THREE.Color(1,1,1),e.opacity=1;var s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){var n=s.baseColorFactor;e.color.fromArray(n),e.opacity=n[3]}void 0!==s.baseColorTexture&&a.push(r.assignTexture(e,"map",s.baseColorTexture))}return Promise.all(a)};var i="glTF",o=12,l={JSON:1313821514,BIN:5130562};function u(e){this.name=r.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,o);if(this.header={magic:THREE.LoaderUtils.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==i)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");for(var a=new DataView(e,o),s=0;s<a.byteLength;){var n=a.getUint32(s,!0);s+=4;var u=a.getUint32(s,!0);if(s+=4,u===l.JSON){var c=new Uint8Array(e,o+s,n);this.content=THREE.LoaderUtils.decodeText(c)}else if(u===l.BIN){var p=o+s;this.body=e.slice(p,p+n)}s+=n}if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}function c(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=r.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}function p(){this.name=r.KHR_TEXTURE_TRANSFORM}function d(e){THREE.MeshStandardMaterial.call(this),this.isGLTFSpecularGlossinessMaterial=!0;var t=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),r=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),a=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),s=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),n=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.","material.specularRoughness += geometryRoughness;","material.specularRoughness = min( material.specularRoughness, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),i={specular:{value:(new THREE.Color).setHex(16777215)},glossiness:{value:1},specularMap:{value:null},glossinessMap:{value:null}};this._extraUniforms=i,this.onBeforeCompile=function(e){for(var o in i)e.uniforms[o]=i[o];e.fragmentShader=e.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;"),e.fragmentShader=e.fragmentShader.replace("uniform float metalness;","uniform float glossiness;"),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_pars_fragment>",t),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_pars_fragment>",r),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",a),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",s),e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_fragment>",n)},Object.defineProperties(this,{specular:{get:function(){return i.specular.value},set:function(e){i.specular.value=e}},specularMap:{get:function(){return i.specularMap.value},set:function(e){i.specularMap.value=e}},glossiness:{get:function(){return i.glossiness.value},set:function(e){i.glossiness.value=e}},glossinessMap:{get:function(){return i.glossinessMap.value},set:function(e){i.glossinessMap.value=e,e?(this.defines.USE_GLOSSINESSMAP="",this.defines.USE_ROUGHNESSMAP=""):(delete this.defines.USE_ROUGHNESSMAP,delete this.defines.USE_GLOSSINESSMAP)}}}),delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this.setValues(e)}function h(){return{name:r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return d},extendParams:function(e,t,r){var a=t.extensions[this.name];e.color=new THREE.Color(1,1,1),e.opacity=1;var s=[];if(Array.isArray(a.diffuseFactor)){var n=a.diffuseFactor;e.color.fromArray(n),e.opacity=n[3]}if(void 0!==a.diffuseTexture&&s.push(r.assignTexture(e,"map",a.diffuseTexture)),e.emissive=new THREE.Color(0,0,0),e.glossiness=void 0!==a.glossinessFactor?a.glossinessFactor:1,e.specular=new THREE.Color(1,1,1),Array.isArray(a.specularFactor)&&e.specular.fromArray(a.specularFactor),void 0!==a.specularGlossinessTexture){var i=a.specularGlossinessTexture;s.push(r.assignTexture(e,"glossinessMap",i)),s.push(r.assignTexture(e,"specularMap",i))}return Promise.all(s)},createMaterial:function(e){var t=new d(e);return t.fog=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,t.normalMapType=THREE.TangentSpaceNormalMap,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t}}}function m(){this.name=r.KHR_MESH_QUANTIZATION}function f(e,t,r,a){THREE.Interpolant.call(this,e,t,r,a)}c.prototype.decodePrimitive=function(e,t){var r=this.json,a=this.dracoLoader,s=e.extensions[this.name].bufferView,n=e.extensions[this.name].attributes,i={},o={},l={};for(var u in n){var c=w[u]||u.toLowerCase();i[c]=n[u]}for(u in e.attributes){c=w[u]||u.toLowerCase();if(void 0!==n[u]){var p=r.accessors[e.attributes[u]],d=S[p.componentType];l[c]=d,o[c]=!0===p.normalized}}return t.getDependency("bufferView",s).then(function(e){return new Promise(function(t){a.decodeDracoFile(e,function(e){for(var r in e.attributes){var a=e.attributes[r],s=o[r];void 0!==s&&(a.normalized=s)}t(e)},i,l)})})},p.prototype.extendTexture=function(e,t){return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},d.prototype=Object.create(THREE.MeshStandardMaterial.prototype),d.prototype.constructor=d,d.prototype.copy=function(e){return THREE.MeshStandardMaterial.prototype.copy.call(this,e),this.specularMap=e.specularMap,this.specular.copy(e.specular),this.glossinessMap=e.glossinessMap,this.glossiness=e.glossiness,delete this.metalness,delete this.roughness,delete this.metalnessMap,delete this.roughnessMap,this},f.prototype=Object.create(THREE.Interpolant.prototype),f.prototype.constructor=f,f.prototype.copySampleValue_=function(e){for(var t=this.resultBuffer,r=this.sampleValues,a=this.valueSize,s=e*a*3+a,n=0;n!==a;n++)t[n]=r[s+n];return t},f.prototype.beforeStart_=f.prototype.copySampleValue_,f.prototype.afterEnd_=f.prototype.copySampleValue_,f.prototype.interpolate_=function(e,t,r,a){for(var s=this.resultBuffer,n=this.sampleValues,i=this.valueSize,o=2*i,l=3*i,u=a-t,c=(r-t)/u,p=c*c,d=p*c,h=e*l,m=h-l,f=-2*d+3*p,E=d-p,g=1-f,T=E-p+c,v=0;v!==i;v++){var R=n[m+v+i],M=n[m+v+o]*u,y=n[h+v+i],S=n[h+v]*u;s[v]=g*R+T*M+f*y+E*S}return s};var E=0,g=1,T=2,v=3,R=4,M=5,y=6,S={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},H={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipmapNearestFilter,9985:THREE.LinearMipmapNearestFilter,9986:THREE.NearestMipmapLinearFilter,9987:THREE.LinearMipmapLinearFilter},L={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping},x={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},w={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},_={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},A={CUBICSPLINE:void 0,LINEAR:THREE.InterpolateLinear,STEP:THREE.InterpolateDiscrete},b="OPAQUE",I="MASK",P="BLEND",F={"image/png":THREE.RGBAFormat,"image/jpeg":THREE.RGBFormat};function U(e,t){return"string"!=typeof e||""===e?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)?e:/^data:.*,.*$/i.test(e)?e:/^blob:.*$/i.test(e)?e:t+e)}function O(e,t,r){for(var a in r.extensions)void 0===e[a]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[a]=r.extensions[a])}function C(e,t){void 0!==t.extras&&("object"==typeof t.extras?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function N(e,t){if(e.updateMorphTargets(),void 0!==t.weights)for(var r=0,a=t.weights.length;r<a;r++)e.morphTargetInfluences[r]=t.weights[r];if(t.extras&&Array.isArray(t.extras.targetNames)){var s=t.extras.targetNames;if(e.morphTargetInfluences.length===s.length){e.morphTargetDictionary={};for(r=0,a=s.length;r<a;r++)e.morphTargetDictionary[s[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function D(e){for(var t="",r=Object.keys(e).sort(),a=0,s=r.length;a<s;a++)t+=r[a]+":"+e[r[a]]+";";return t}function G(e,r,a){this.json=e||{},this.extensions=r||{},this.options=a||{},this.cache=new t,this.primitiveCache={},this.textureLoader=new THREE.TextureLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new THREE.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),"use-credentials"===this.options.crossOrigin&&this.fileLoader.setWithCredentials(!0)}function B(e,t,r){var a=t.attributes,s=[];function n(t,a){return r.getDependency("accessor",t).then(function(t){e.setAttribute(a,t)})}for(var i in a){var o=w[i]||i.toLowerCase();o in e.attributes||s.push(n(a[i],o))}if(void 0!==t.indices&&!e.index){var l=r.getDependency("accessor",t.indices).then(function(t){e.setIndex(t)});s.push(l)}return C(e,t),function(e,t,r){var a=t.attributes,s=new THREE.Box3;if(void 0!==a.POSITION){var n=(p=r.json.accessors[a.POSITION]).min,i=p.max;if(void 0!==n&&void 0!==i){s.set(new THREE.Vector3(n[0],n[1],n[2]),new THREE.Vector3(i[0],i[1],i[2]));var o=t.targets;if(void 0!==o)for(var l=new THREE.Vector3,u=0,c=o.length;u<c;u++){var p,d=o[u];if(void 0!==d.POSITION)n=(p=r.json.accessors[d.POSITION]).min,i=p.max,void 0!==n&&void 0!==i?(l.setX(Math.max(Math.abs(n[0]),Math.abs(i[0]))),l.setY(Math.max(Math.abs(n[1]),Math.abs(i[1]))),l.setZ(Math.max(Math.abs(n[2]),Math.abs(i[2]))),s.expandByVector(l)):console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}e.boundingBox=s;var h=new THREE.Sphere;s.getCenter(h.center),h.radius=s.min.distanceTo(s.max)/2,e.boundingSphere=h}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}(e,t,r),Promise.all(s).then(function(){return void 0!==t.targets?function(e,t,r){for(var a=!1,s=!1,n=0,i=t.length;n<i&&(void 0!==(u=t[n]).POSITION&&(a=!0),void 0!==u.NORMAL&&(s=!0),!a||!s);n++);if(!a&&!s)return Promise.resolve(e);var o=[],l=[];for(n=0,i=t.length;n<i;n++){var u=t[n];if(a){var c=void 0!==u.POSITION?r.getDependency("accessor",u.POSITION):e.attributes.position;o.push(c)}s&&(c=void 0!==u.NORMAL?r.getDependency("accessor",u.NORMAL):e.attributes.normal,l.push(c))}return Promise.all([Promise.all(o),Promise.all(l)]).then(function(t){var r=t[0],n=t[1];return a&&(e.morphAttributes.position=r),s&&(e.morphAttributes.normal=n),e.morphTargetsRelative=!0,e})}(e,t.targets,r):e})}function k(e,t){var r=e.getIndex();if(null===r){var a=[],s=e.getAttribute("position");if(void 0===s)return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(var n=0;n<s.count;n++)a.push(n);e.setIndex(a),r=e.getIndex()}var i=r.count-2,o=[];if(t===THREE.TriangleFanDrawMode)for(n=1;n<=i;n++)o.push(r.getX(0)),o.push(r.getX(n)),o.push(r.getX(n+1));else for(n=0;n<i;n++)n%2==0?(o.push(r.getX(n)),o.push(r.getX(n+1)),o.push(r.getX(n+2))):(o.push(r.getX(n+2)),o.push(r.getX(n+1)),o.push(r.getX(n)));o.length/3!==i&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");var l=e.clone();return l.setIndex(o),l}return G.prototype.parse=function(e,t){var r=this,a=this.json,s=this.extensions;this.cache.removeAll(),this.markDefs(),Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then(function(t){var n={scene:t[0][a.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:a.asset,parser:r,userData:{}};O(s,n,a),C(n,a),e(n)}).catch(t)},G.prototype.markDefs=function(){for(var e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[],a={},s={},n=0,i=t.length;n<i;n++)for(var o=t[n].joints,l=0,u=o.length;l<u;l++)e[o[l]].isBone=!0;for(var c=0,p=e.length;c<p;c++){var d=e[c];void 0!==d.mesh&&(void 0===a[d.mesh]&&(a[d.mesh]=s[d.mesh]=0),a[d.mesh]++,void 0!==d.skin&&(r[d.mesh].isSkinnedMesh=!0))}this.json.meshReferences=a,this.json.meshUses=s},G.prototype.getDependency=function(e,t){var a=e+":"+t,s=this.cache.get(a);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this.loadNode(t);break;case"mesh":s=this.loadMesh(t);break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this.loadBufferView(t);break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this.loadMaterial(t);break;case"texture":s=this.loadTexture(t);break;case"skin":s=this.loadSkin(t);break;case"animation":s=this.loadAnimation(t);break;case"camera":s=this.loadCamera(t);break;case"light":s=this.extensions[r.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(a,s)}return s},G.prototype.getDependencies=function(e){var t=this.cache.get(e);if(!t){var r=this,a=this.json[e+("mesh"===e?"es":"s")]||[];t=Promise.all(a.map(function(t,a){return r.getDependency(e,a)})),this.cache.add(e,t)}return t},G.prototype.loadBuffer=function(e){var t=this.json.buffers[e],a=this.fileLoader;if(t.type&&"arraybuffer"!==t.type)throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(void 0===t.uri&&0===e)return Promise.resolve(this.extensions[r.KHR_BINARY_GLTF].body);var s=this.options;return new Promise(function(e,r){a.load(U(t.uri,s.path),e,void 0,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})},G.prototype.loadBufferView=function(e){var t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(e){var r=t.byteLength||0,a=t.byteOffset||0;return e.slice(a,a+r)})},G.prototype.loadAccessor=function(e){var t=this,r=this.json,a=this.json.accessors[e];if(void 0===a.bufferView&&void 0===a.sparse)return Promise.resolve(null);var s=[];return void 0!==a.bufferView?s.push(this.getDependency("bufferView",a.bufferView)):s.push(null),void 0!==a.sparse&&(s.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(s).then(function(e){var s,n,i=e[0],o=x[a.type],l=S[a.componentType],u=l.BYTES_PER_ELEMENT,c=u*o,p=a.byteOffset||0,d=void 0!==a.bufferView?r.bufferViews[a.bufferView].byteStride:void 0,h=!0===a.normalized;if(d&&d!==c){var m=Math.floor(p/d),f="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+m+":"+a.count,E=t.cache.get(f);E||(s=new l(i,m*d,a.count*d/u),E=new THREE.InterleavedBuffer(s,d/u),t.cache.add(f,E)),n=new THREE.InterleavedBufferAttribute(E,o,p%d/u,h)}else s=null===i?new l(a.count*o):new l(i,p,a.count*o),n=new THREE.BufferAttribute(s,o,h);if(void 0!==a.sparse){var g=x.SCALAR,T=S[a.sparse.indices.componentType],v=a.sparse.indices.byteOffset||0,R=a.sparse.values.byteOffset||0,M=new T(e[1],v,a.sparse.count*g),y=new l(e[2],R,a.sparse.count*o);null!==i&&(n=new THREE.BufferAttribute(n.array.slice(),n.itemSize,n.normalized));for(var H=0,L=M.length;H<L;H++){var w=M[H];if(n.setX(w,y[H*o]),o>=2&&n.setY(w,y[H*o+1]),o>=3&&n.setZ(w,y[H*o+2]),o>=4&&n.setW(w,y[H*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return n})},G.prototype.loadTexture=function(e){var t,a=this,s=this.json,n=this.options,i=this.textureLoader,o=window.URL||window.webkitURL,l=s.textures[e],u=l.extensions||{},c=(t=u[r.MSFT_TEXTURE_DDS]?s.images[u[r.MSFT_TEXTURE_DDS].source]:s.images[l.source]).uri,p=!1;return void 0!==t.bufferView&&(c=a.getDependency("bufferView",t.bufferView).then(function(e){p=!0;var r=new Blob([e],{type:t.mimeType});return c=o.createObjectURL(r)})),Promise.resolve(c).then(function(e){var t=n.manager.getHandler(e);return t||(t=u[r.MSFT_TEXTURE_DDS]?a.extensions[r.MSFT_TEXTURE_DDS].ddsLoader:i),new Promise(function(r,a){t.load(U(e,n.path),r,void 0,a)})}).then(function(e){!0===p&&o.revokeObjectURL(c),e.flipY=!1,void 0!==l.name&&(e.name=l.name),t.mimeType in F&&(e.format=F[t.mimeType]);var r=(s.samplers||{})[l.sampler]||{};return e.magFilter=H[r.magFilter]||THREE.LinearFilter,e.minFilter=H[r.minFilter]||THREE.LinearMipmapLinearFilter,e.wrapS=L[r.wrapS]||THREE.RepeatWrapping,e.wrapT=L[r.wrapT]||THREE.RepeatWrapping,e})},G.prototype.assignTexture=function(e,t,a){var s=this;return this.getDependency("texture",a.index).then(function(n){if(!n.isCompressedTexture)switch(t){case"aoMap":case"emissiveMap":case"metalnessMap":case"normalMap":case"roughnessMap":n.format=THREE.RGBFormat}if(void 0===a.texCoord||0==a.texCoord||"aoMap"===t&&1==a.texCoord||console.warn("THREE.GLTFLoader: Custom UV set "+a.texCoord+" for texture "+t+" not yet supported."),s.extensions[r.KHR_TEXTURE_TRANSFORM]){var i=void 0!==a.extensions?a.extensions[r.KHR_TEXTURE_TRANSFORM]:void 0;i&&(n=s.extensions[r.KHR_TEXTURE_TRANSFORM].extendTexture(n,i))}e[t]=n})},G.prototype.assignFinalMaterial=function(e){var t=e.geometry,r=e.material,a=(this.extensions,void 0!==t.attributes.tangent),s=void 0!==t.attributes.color,n=void 0===t.attributes.normal,i=!0===e.isSkinnedMesh,o=Object.keys(t.morphAttributes).length>0,l=o&&void 0!==t.morphAttributes.normal;if(e.isPoints){var u="PointsMaterial:"+r.uuid,c=this.cache.get(u);c||(c=new THREE.PointsMaterial,THREE.Material.prototype.copy.call(c,r),c.color.copy(r.color),c.map=r.map,c.sizeAttenuation=!1,this.cache.add(u,c)),r=c}else if(e.isLine){u="LineBasicMaterial:"+r.uuid;var p=this.cache.get(u);p||(p=new THREE.LineBasicMaterial,THREE.Material.prototype.copy.call(p,r),p.color.copy(r.color),this.cache.add(u,p)),r=p}if(a||s||n||i||o){u="ClonedMaterial:"+r.uuid+":";r.isGLTFSpecularGlossinessMaterial&&(u+="specular-glossiness:"),i&&(u+="skinning:"),a&&(u+="vertex-tangents:"),s&&(u+="vertex-colors:"),n&&(u+="flat-shading:"),o&&(u+="morph-targets:"),l&&(u+="morph-normals:");var d=this.cache.get(u);d||(d=r.clone(),i&&(d.skinning=!0),a&&(d.vertexTangents=!0),s&&(d.vertexColors=THREE.VertexColors),n&&(d.flatShading=!0),o&&(d.morphTargets=!0),l&&(d.morphNormals=!0),this.cache.add(u,d)),r=d}r.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.setAttribute("uv2",new THREE.BufferAttribute(t.attributes.uv.array,2)),r.normalScale&&!a&&(r.normalScale.y=-r.normalScale.y),e.material=r},G.prototype.loadMaterial=function(e){var t,a=this.json,s=this.extensions,n=a.materials[e],i={},o=n.extensions||{},l=[];if(o[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var u=s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=u.getMaterialType(),l.push(u.extendParams(i,n,this))}else if(o[r.KHR_MATERIALS_UNLIT]){var c=s[r.KHR_MATERIALS_UNLIT];t=c.getMaterialType(),l.push(c.extendParams(i,n,this))}else{t=THREE.MeshStandardMaterial;var p=n.pbrMetallicRoughness||{};if(i.color=new THREE.Color(1,1,1),i.opacity=1,Array.isArray(p.baseColorFactor)){var h=p.baseColorFactor;i.color.fromArray(h),i.opacity=h[3]}void 0!==p.baseColorTexture&&l.push(this.assignTexture(i,"map",p.baseColorTexture)),i.metalness=void 0!==p.metallicFactor?p.metallicFactor:1,i.roughness=void 0!==p.roughnessFactor?p.roughnessFactor:1,void 0!==p.metallicRoughnessTexture&&(l.push(this.assignTexture(i,"metalnessMap",p.metallicRoughnessTexture)),l.push(this.assignTexture(i,"roughnessMap",p.metallicRoughnessTexture)))}!0===n.doubleSided&&(i.side=THREE.DoubleSide);var m=n.alphaMode||b;return m===P?i.transparent=!0:(i.transparent=!1,m===I&&(i.alphaTest=void 0!==n.alphaCutoff?n.alphaCutoff:.5)),void 0!==n.normalTexture&&t!==THREE.MeshBasicMaterial&&(l.push(this.assignTexture(i,"normalMap",n.normalTexture)),i.normalScale=new THREE.Vector2(1,1),void 0!==n.normalTexture.scale&&i.normalScale.set(n.normalTexture.scale,n.normalTexture.scale)),void 0!==n.occlusionTexture&&t!==THREE.MeshBasicMaterial&&(l.push(this.assignTexture(i,"aoMap",n.occlusionTexture)),void 0!==n.occlusionTexture.strength&&(i.aoMapIntensity=n.occlusionTexture.strength)),void 0!==n.emissiveFactor&&t!==THREE.MeshBasicMaterial&&(i.emissive=(new THREE.Color).fromArray(n.emissiveFactor)),void 0!==n.emissiveTexture&&t!==THREE.MeshBasicMaterial&&l.push(this.assignTexture(i,"emissiveMap",n.emissiveTexture)),Promise.all(l).then(function(){var e;return e=t===d?s[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(i):new t(i),void 0!==n.name&&(e.name=n.name),e.map&&(e.map.encoding=THREE.sRGBEncoding),e.emissiveMap&&(e.emissiveMap.encoding=THREE.sRGBEncoding),C(e,n),n.extensions&&O(s,e,n),e})},G.prototype.loadGeometries=function(e){var t=this,a=this.extensions,s=this.primitiveCache;function n(e){return a[r.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(r){return B(r,e,t)})}for(var i,o,l=[],u=0,c=e.length;u<c;u++){var p,d=e[u],h=(o=void 0,(o=(i=d).extensions&&i.extensions[r.KHR_DRACO_MESH_COMPRESSION])?"draco:"+o.bufferView+":"+o.indices+":"+D(o.attributes):i.indices+":"+D(i.attributes)+":"+i.mode),m=s[h];if(m)l.push(m.promise);else p=d.extensions&&d.extensions[r.KHR_DRACO_MESH_COMPRESSION]?n(d):B(new THREE.BufferGeometry,d,t),s[h]={primitive:d,promise:p},l.push(p)}return Promise.all(l)},G.prototype.loadMesh=function(e){for(var t,r=this,a=this.json.meshes[e],s=a.primitives,n=[],i=0,o=s.length;i<o;i++){var l=void 0===s[i].material?(void 0===(t=this.cache).DefaultMaterial&&(t.DefaultMaterial=new THREE.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:THREE.FrontSide})),t.DefaultMaterial):this.getDependency("material",s[i].material);n.push(l)}return n.push(r.loadGeometries(s)),Promise.all(n).then(function(t){for(var n=t.slice(0,t.length-1),i=t[t.length-1],o=[],l=0,u=i.length;l<u;l++){var c,p=i[l],d=s[l],h=n[l];if(d.mode===R||d.mode===M||d.mode===y||void 0===d.mode)!0!==(c=!0===a.isSkinnedMesh?new THREE.SkinnedMesh(p,h):new THREE.Mesh(p,h)).isSkinnedMesh||c.geometry.attributes.skinWeight.normalized||c.normalizeSkinWeights(),d.mode===M?c.geometry=k(c.geometry,THREE.TriangleStripDrawMode):d.mode===y&&(c.geometry=k(c.geometry,THREE.TriangleFanDrawMode));else if(d.mode===g)c=new THREE.LineSegments(p,h);else if(d.mode===v)c=new THREE.Line(p,h);else if(d.mode===T)c=new THREE.LineLoop(p,h);else{if(d.mode!==E)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);c=new THREE.Points(p,h)}Object.keys(c.geometry.morphAttributes).length>0&&N(c,a),c.name=a.name||"mesh_"+e,i.length>1&&(c.name+="_"+l),C(c,a),r.assignFinalMaterial(c),o.push(c)}if(1===o.length)return o[0];var m=new THREE.Group;for(l=0,u=o.length;l<u;l++)m.add(o[l]);return m})},G.prototype.loadCamera=function(e){var t,r=this.json.cameras[e],a=r[r.type];if(a)return"perspective"===r.type?t=new THREE.PerspectiveCamera(THREE.MathUtils.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):"orthographic"===r.type&&(t=new THREE.OrthographicCamera(a.xmag/-2,a.xmag/2,a.ymag/2,a.ymag/-2,a.znear,a.zfar)),void 0!==r.name&&(t.name=r.name),C(t,r),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},G.prototype.loadSkin=function(e){var t=this.json.skins[e],r={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(r):this.getDependency("accessor",t.inverseBindMatrices).then(function(e){return r.inverseBindMatrices=e,r})},G.prototype.loadAnimation=function(e){for(var t=this.json.animations[e],r=[],a=[],s=[],n=[],i=[],o=0,l=t.channels.length;o<l;o++){var u=t.channels[o],c=t.samplers[u.sampler],p=u.target,d=void 0!==p.node?p.node:p.id,h=void 0!==t.parameters?t.parameters[c.input]:c.input,m=void 0!==t.parameters?t.parameters[c.output]:c.output;r.push(this.getDependency("node",d)),a.push(this.getDependency("accessor",h)),s.push(this.getDependency("accessor",m)),n.push(c),i.push(p)}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(s),Promise.all(n),Promise.all(i)]).then(function(r){for(var a=r[0],s=r[1],n=r[2],i=r[3],o=r[4],l=[],u=0,c=a.length;u<c;u++){var p=a[u],d=s[u],h=n[u],m=i[u],E=o[u];if(void 0!==p){var g;switch(p.updateMatrix(),p.matrixAutoUpdate=!0,_[E.path]){case _.weights:g=THREE.NumberKeyframeTrack;break;case _.rotation:g=THREE.QuaternionKeyframeTrack;break;case _.position:case _.scale:default:g=THREE.VectorKeyframeTrack}var T=p.name?p.name:p.uuid,v=void 0!==m.interpolation?A[m.interpolation]:THREE.InterpolateLinear,R=[];_[E.path]===_.weights?p.traverse(function(e){!0===e.isMesh&&e.morphTargetInfluences&&R.push(e.name?e.name:e.uuid)}):R.push(T);var M=h.array;if(h.normalized){var y;if(M.constructor===Int8Array)y=1/127;else if(M.constructor===Uint8Array)y=1/255;else if(M.constructor==Int16Array)y=1/32767;else{if(M.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");y=1/65535}for(var S=new Float32Array(M.length),H=0,L=M.length;H<L;H++)S[H]=M[H]*y;M=S}for(H=0,L=R.length;H<L;H++){var x=new g(R[H]+"."+_[E.path],d.array,M,v);"CUBICSPLINE"===m.interpolation&&(x.createInterpolant=function(e){return new f(this.times,this.values,this.getValueSize()/3,e)},x.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(x)}}}var w=void 0!==t.name?t.name:"animation_"+e;return new THREE.AnimationClip(w,void 0,l)})},G.prototype.loadNode=function(e){var t,a=this.json,s=this.extensions,n=this,i=a.meshReferences,o=a.meshUses,l=a.nodes[e];return(t=[],void 0!==l.mesh&&t.push(n.getDependency("mesh",l.mesh).then(function(e){var t;if(i[l.mesh]>1){var r=o[l.mesh]++;(t=e.clone()).name+="_instance_"+r}else t=e;return void 0!==l.weights&&t.traverse(function(e){if(e.isMesh)for(var t=0,r=l.weights.length;t<r;t++)e.morphTargetInfluences[t]=l.weights[t]}),t})),void 0!==l.camera&&t.push(n.getDependency("camera",l.camera)),l.extensions&&l.extensions[r.KHR_LIGHTS_PUNCTUAL]&&void 0!==l.extensions[r.KHR_LIGHTS_PUNCTUAL].light&&t.push(n.getDependency("light",l.extensions[r.KHR_LIGHTS_PUNCTUAL].light)),Promise.all(t)).then(function(e){var t;if((t=!0===l.isBone?new THREE.Bone:e.length>1?new THREE.Group:1===e.length?e[0]:new THREE.Object3D)!==e[0])for(var r=0,a=e.length;r<a;r++)t.add(e[r]);if(void 0!==l.name&&(t.userData.name=l.name,t.name=THREE.PropertyBinding.sanitizeNodeName(l.name)),C(t,l),l.extensions&&O(s,t,l),void 0!==l.matrix){var n=new THREE.Matrix4;n.fromArray(l.matrix),t.applyMatrix4(n)}else void 0!==l.translation&&t.position.fromArray(l.translation),void 0!==l.rotation&&t.quaternion.fromArray(l.rotation),void 0!==l.scale&&t.scale.fromArray(l.scale);return t})},G.prototype.loadScene=function(){function e(t,r,a,s){var n=a.nodes[t];return s.getDependency("node",t).then(function(e){return void 0===n.skin?e:s.getDependency("skin",n.skin).then(function(e){for(var r=[],a=0,n=(t=e).joints.length;a<n;a++)r.push(s.getDependency("node",t.joints[a]));return Promise.all(r)}).then(function(r){return e.traverse(function(e){if(e.isMesh){for(var a=[],s=[],n=0,i=r.length;n<i;n++){var o=r[n];if(o){a.push(o);var l=new THREE.Matrix4;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*n),s.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[n])}e.bind(new THREE.Skeleton(a,s),e.matrixWorld)}}),e});var t}).then(function(t){r.add(t);var i=[];if(n.children)for(var o=n.children,l=0,u=o.length;l<u;l++){var c=o[l];i.push(e(c,t,a,s))}return Promise.all(i)})}return function(t){var r=this.json,a=this.extensions,s=this.json.scenes[t],n=new THREE.Scene;void 0!==s.name&&(n.name=s.name),C(n,s),s.extensions&&O(a,n,s);for(var i=s.nodes||[],o=[],l=0,u=i.length;l<u;l++)o.push(e(i[l],n,r,this));return Promise.all(o).then(function(){return n})}}(),e}();
