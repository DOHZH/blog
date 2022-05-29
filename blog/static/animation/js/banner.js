function lerp(ratio, start, end) {
    return start + (end - start) * ratio
}
function rand(min, max){
    return this.lerp(Math.random(), min, max)
}
let body = document.getElementsByTagName("body")[0];

class Component{
    constructor(path){
        this._path = path;
    }

    loadModel(){
        let xhr = new XMLHttpRequest();
        xhr.open("get", this._path, false);
        xhr.send(null);
        let imp = xhr.responseText;
        let mod_json = JSON.parse(imp);
        const loader = new THREE.ObjectLoader();
        let model = loader.parse(mod_json);
        return model;
    }
}

class Earth extends Component{
    constructor(path){
        super(path);
        this._earth = this.loadModel();
        this._land;
        this._sea;
        this._sphere;
        this._model = new THREE.Group();
        this._cube;
        this._glow;
    }

    setOceanAttributes(geom) {
        let position = geom.attributes.position;
        let angle = new Float32Array(position.count);
        let speed = new Float32Array(position.count);
        let radius = new Float32Array(position.count);
        let len = position.count;
        for (let i = 0; i < len; i++) {
            angle[i] = Math.round(rand(0-0.5, 360+0.5))* (180 / Math.PI);
            speed[i] = Math.round(rand(50 - 0.5, 150 + 0.5))/ 150;
            radius[i] = Math.round(rand(-10-0.5, 10)) / 100;
        }
        geom["angle"] = new THREE.BufferAttribute(angle, 1);
        geom["speed"] = new THREE.BufferAttribute(speed, 1);
        geom["radius"] = new THREE.BufferAttribute(radius, 1)
    }

    initCube(){
        this._cube = new THREE.CubeCamera(10, 10000, 1024);
        this._model.add(this._cube);
    }

    initMesh(){
        this._model.add(this._earth);
        //land
        this._land = this._earth.children[0].children[0];
        this._land.frustumCulled = false;
        let landtexture = new THREE.ShaderMaterial({
            uniforms: {
                light: {
                    type: "v3",
                    value: new THREE.Vector3(-5000, 2000, -5000)
                },
                ambient1: {
                    type: "c",
                    value: new THREE.Color(10733036)
                },
                ambient2: {
                    type: "c",
                    value: new THREE.Color(8950227)
                },
                rimColor: {
                    type: "c",
                    value: new THREE.Color(4661124)
                },
                map: {
                    type: "t",
                    value: new THREE.TextureLoader().load(shadow_path)
                },
                shadowMix: {
                    type: "f",
                    value: 0
                },
                fadeOut: {
                    type: "f",
                    value: 0
                },
                time: {
                    type: "f",
                    value: 0
                },
            },
            vertexShader: document.getElementById("vs_land").textContent,
	        fragmentShader: document.getElementById("fs_land").textContent
        });
        this._land.material = landtexture;
        this._land.scale.set(0.975, 0.975, 0.975);
        this._land.material.uniforms['ambient1'].value = new THREE.Color(9886694);
        this._land.material.uniforms['ambient2'].value = new THREE.Color(7248598);
        
        //sea
        this._sea = this._earth.children[2].children[0];
        this._sea.frustumCulled = false;
        this._sea.geometry = new THREE.BufferGeometry().fromGeometry(this._sea.geometry);
        let seatexture = new THREE.ShaderMaterial({
            uniforms : {
                light: {
                    type: "v3",
                    value: new THREE.Vector3(-5000, 2000, -5000)
                },
                ambient1: {
                    type: "c",
                    value: new THREE.Color(10733036)
                },
                ambient2: {
                    type: "c",
                    value: new THREE.Color(8950227)
                },
                rimColor: {
                    type: "c",
                    value: new THREE.Color(4661124)
                },
                map: {
                    type: "t",
                    value: new THREE.TextureLoader().load(shadow_path)
                },
                shadowMix: {
                    type: "f",
                    value: 1
                },
                fadeOut: {
                    type: "f",
                    value: 0
                },
                time: {
                    type: "f",
                    value: 0
                },
            },
            vertexShader: document.getElementById("vs_sea").textContent,
	        fragmentShader: document.getElementById("fs_sea").textContent
        });
        this._sea.material = seatexture;
        this.setOceanAttributes(this._sea.geometry);
        
        //sphere
        this._sphere = this._earth.children[1].children[0];
        let spheretexture = new THREE.ShaderMaterial({
            uniforms : {
                tCube: {
                    type: "t",
                    value: this._cube.texture
                }
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: document.getElementById("vs_sphere").textContent,
	        fragmentShader: document.getElementById("fs_sphere").textContent
        })
        this._sphere.scale.set(0.975, 0.975, 0.975);
        this._sphere.material = spheretexture;
        let plane = new THREE.PlaneBufferGeometry(1800, 1800);
        let img = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(glow_path),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
            opacity:0,
        });
        this._glow = new THREE.Mesh(plane, img);
        this._glow.frustumCulled = false;
        this._glow.rotation.y = Math.PI;
        this._glow.position.z = 160;
        let s_glow = 0.5;
        this._glow.scale.set(s_glow, s_glow, s_glow);
    }

    init(){
        this.initCube();
        this.initMesh();
    }

    getMod(){
        return this._model;
    }

    getglow(){
        return this._glow;
    }
    

}

class Background{
    constructor(){
        this._colors = {
            purple: "#9da4e1",
            blue: "#83c9de",
            pink: "#d7b7ea",
        };
        this._shader;
        this._object3D;
    }

    init(){
        let geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
        this._shader = new THREE.ShaderMaterial({
            uniforms:{
                time: {
                    type: "f",
                    value: 0
                },
                resolution: {
                    type: "v2",
                    value: new THREE.Vector2(stage.width, stage.height)
                },
                color0: {
                    type: "c",
                    value: new THREE.Color(this._colors.purple)
                },
                color1: {
                    type: "c",
                    value: new THREE.Color(this._colors.blue)
                },
                color2: {
                    type: "c",
                    value: new THREE.Color(this._colors.pink)
                },
                camera: {
                    type: "c",
                    value: new THREE.Color(this._colors.pink)
                },
                override: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: document.getElementById("vs_back").textContent,
	        fragmentShader: document.getElementById("fs_back").textContent
        });
        this._shader.depthTest = false;
        let mesh = new THREE.Mesh(geometry, this._shader);
        mesh.frustumCulled = false;
        this._object3D = mesh;
    }

    //背景循环
    loop(dt){
        this._shader.uniforms.time.value += dt;
    }

    getback(){
        return this._object3D;
    }
}

class Text{
    constructor(text){
        this._html = document.createElement("div");
        this._parent = document.getElementById("text");
        this._html.textContent = text;
        this._html.className = "banner_text";
    }
    add_css(css_name){
        this._html.classList.add(css_name);
    }
    add_to_html(){
        this._parent.appendChild(this._html);
    }
    resize(){
        this._html.style.fontSize = Math.min(body.offsetWidth, window.innerHeight)/3 + 'px';
    }
    see(){
        this._html.style.fontSize = Math.min(body.offsetWidth, window.innerHeight)/3 + 'px';
        this._html.style.opacity = 1;
    }
    top(){
        this._html.style.top = document.getElementsByTagName("canvas")[0].offsetHeight/4 +"px";
    }
}

let scene = new THREE.Scene(); 
let stage = document.getElementById("banner");
var axisHelper = new THREE.AxisHelper(250);
scene.add(axisHelper);
let back = new Background();
back.init();
scene.add(back.getback());
let earth = new Earth(json_path);
earth.init();
scene.add(earth.getMod());
scene.add(earth.getglow());

let point = new THREE.PointLight(0xFFFFFF);//规定光源颜色，一般都是白光，即0xffffff
point.position.set(400, 1000, 300);//规定光源位置
scene.add(point);
earth.getMod().translateY(-3);
earth.getMod().translateX(3);

let welcome = new Text("Welcome");
welcome.add_css("welcome");
let my_text = new Text("My Blog!");
my_text.add_css("blog_text");
welcome.add_to_html();
my_text.add_to_html();


let width = body.offsetWidth; 
let height = window.innerHeight/2; 
let k = width / height; 
let camera = new THREE.PerspectiveCamera(10, k, 1, 1000);
camera.position.set(0, 0, 5); 
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

banner.appendChild(renderer.domElement);
renderer.render(scene, camera);

let T0 = new Date();
function render() {
    let T1 = new Date();
    let t = T1-T0;
    T0=T1
    renderer.render(scene,camera);//执行渲染操作
    earth.getMod().rotateY(0.001*t);//旋转角速度0.001弧度每毫秒，绕y轴
    back.loop(50);
    if (earth.getMod().position.y<0){
        earth.getMod().translateY(0.0015*t);
    }
    if (camera.fov <55){
        camera.fov += 0.02*t;
    }
    let text_banner = (camera.fov >= 55)&&(earth.getMod().position.y>=0);
    if (text_banner){
        welcome.see();
        my_text.see();
        my_text.top();
    }
    camera.updateProjectionMatrix ();
    requestAnimationFrame(render);//请求再次执行渲染函数render
}
window.onresize=function(){
    renderer.setSize(body.offsetWidth,window.innerHeight/2);
    camera.aspect = body.offsetWidth/(window.innerHeight/2);
    welcome.resize();
    my_text.resize();
    my_text.top();
    camera.updateProjectionMatrix ();
}
render();