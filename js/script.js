/*
________/\\\\\\\\\_____/\\\\\\\\\_______/\\\\\\\\\______/\\\___________________/\\\\\__________/\\\\\\\\\\\___        
 _____/\\\////////____/\\\\\\\\\\\\\___/\\\///////\\\___\/\\\_________________/\\\///\\\______/\\\/////////\\\_       
  ___/\\\/____________/\\\/////////\\\_\/\\\_____\/\\\___\/\\\_______________/\\\/__\///\\\___\//\\\______\///__      
   __/\\\_____________\/\\\_______\/\\\_\/\\\\\\\\\\\/____\/\\\______________/\\\______\//\\\___\////\\\_________     
    _\/\\\_____________\/\\\\\\\\\\\\\\\_\/\\\//////\\\____\/\\\_____________\/\\\_______\/\\\______\////\\\______    
     _\//\\\____________\/\\\/////////\\\_\/\\\____\//\\\___\/\\\_____________\//\\\______/\\\__________\////\\\___   
      __\///\\\__________\/\\\_______\/\\\_\/\\\_____\//\\\__\/\\\______________\///\\\__/\\\_____/\\\______\//\\\__  
       ____\////\\\\\\\\\_\/\\\_______\/\\\_\/\\\______\//\\\_\/\\\\\\\\\\\\\\\____\///\\\\\/_____\///\\\\\\\\\\\/___ 
        _______\/////////__\///________\///__\///________\///__\///////////////_______\/////_________\///////////_____
        www.carlos.angon.me / twitter @monster_bo1
*/

window.onload = function (){

if (!Detector.webgl) Detector.addGetWebGLMessage();

        var camera, controls, scene, renderer;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0004);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(scene.fog.color, 0.02)
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.set(0, 100, 700);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.autoRotate = false;
        controls.enableZoom = true;
        controls.minDistance = 100;
        controls.maxDistance = 800;


        var materialTop = new THREE.MeshBasicMaterial({
            color: 0xE91E63,
            transparent: true,
            wireframe: true
        });

        var materialBottom = new THREE.MeshBasicMaterial({
            color: 0x3D5AFE,
            transparent: true,
            wireframe: true
        });


        var materialLeft = new THREE.MeshBasicMaterial({
            color: 0x3D5AFE
        });

        var materialRight = new THREE.MeshBasicMaterial({
            color: 0xF50057
        });

        // bg beam
        var geometryLeft = new THREE.PlaneGeometry(1400, 10, 50, 50);

        var meshLeft = new THREE.Mesh(geometryLeft, materialLeft);
        meshLeft.position.set(-40, 50, -1500);
        meshLeft.rotation.z = 100;
        scene.add(meshLeft);

        var beamRed = new THREE.Mesh(geometryLeft, materialRight);
        beamRed.position.set(-240, 150, -1500);
        beamRed.rotation.z = -150;
        beamRed.rotation.y = 150;
        scene.add(beamRed);

        // top wall
        var geometryTop = new THREE.PlaneGeometry(5000, 5000, 50, 50);
        var meshTop = new THREE.Mesh(geometryTop, materialTop);
        meshTop.rotation.x = -90 * Math.PI / 180;

        meshTop.position.y = 200;
        scene.add(meshTop);

        var Bottom__grid = new THREE.GridHelper(5000, 100);
        Bottom__grid.setColors(0xffffff, 0xAF0808);
        Bottom__grid.position.y = -160;
        scene.add(Bottom__grid);

        var geometry = new THREE.BoxBufferGeometry(95, 95, 95);
        var edges = new THREE.EdgesGeometry(geometry);

        var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
            color: 0x651FFF,
            transparent: true,
            opacity: 1,
            wireframe: true,
            wireframeLinewidth: 2
        }));
        line.position.y = 100;
        line.rotation.y = 10;
        scene.add(line);

        var line2 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
            color: 0xF50057,
            transparent: true,
            opacity: 1,
            wireframe: true,
            wireframeLinewidth: 2
        }));

        line2.position.y = -100;
        line2.rotation.y = -90;
        line2.setSize = (95, 110, 100);
        scene.add(line2);

        var line3 = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
            color: 0x3D5AFE,
            transparent: true,
            opacity: 1,
            wireframe: true,
            wireframeLinewidth: 2
        }));

        line3.setSize = (95, 110, 500);
        line3.rotation.y = 5;

        scene.add(line3);

        var material = new THREE.MeshBasicMaterial({
            color: 0x651FFF,
            transparent: true,
            wireframe: true,
            wireframeLinewidth: 2
        });

        var itmArr = [];

        var coneGeometry = new THREE.ConeBufferGeometry(25, 75, 15);

        (function() {
            for (var i = 0; i < 100; i++) {
                var cone = new THREE.Mesh(coneGeometry, material);
                cone.position.z = (Math.random() - Math.random()) * 2200;
                cone.position.x = (Math.random() - Math.random()) * 2200;
                cone.position.y = (Math.random() - Math.random()) - 20;
                scene.add(cone);
                itmArr.push(cone);
            }
        })();

        var venus__material = new THREE.MeshPhongMaterial({
            color: 0x000000,
            specular: 0xffffff,
            combine: THREE.MultiplyOperation,
            shininess: 20,
            reflectivity: 0.010,
            roughness: 2.5,
            opacity: 0.9,
            transparent: true
        });

        // venus setup

        var loader = new THREE.JSONLoader();

        loader.load('venus.js', function(venus__geometry) {

            venus__mesh = new THREE.Mesh(venus__geometry, venus__material);
            venus__mesh.position.set(0, -180, 0);
            venus__mesh.scale.set(45, 45, 45);
            scene.add(venus__mesh);
        });

        // lights

        light = new THREE.DirectionalLight(0xFFFFFF, 0.2);
        light.position.set(-1, 0, 10);
        scene.add(light);

        light = new THREE.DirectionalLight(0x000000, 0.6);
        light.position.set(-1, 10, 10);
        scene.add(light);

        light = new THREE.AmbientLight(0xFFFFFF, 10);
        light.position.set(0, 0, -10);
        scene.add(light);

        light_top = new THREE.AmbientLight(0xFFFFFF, 0.5);
        light_top.position.set(0, 0, 10)
        scene.add(light_top);

        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        var delta = 0;

        var beta = 0;

        var render = function() {

            requestAnimationFrame(render);

            delta += 0.0005;
            beta += 0.0009;

            camera.lookAt(light.position);
            camera.position.x = Math.sin(delta) * 1200;
            camera.position.z = Math.cos(delta) * 1200;
            renderer.render(scene, camera);
        }
        render();

}
