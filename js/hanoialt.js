AFRAME.registerComponent('vr-switcher', {

init: function(){
    var scene = document.querySelector('a-scene');

   scene.addEventListener('enter-vr', function () {

        console.log("entered vr");
        if(AFRAME.utils.device.isMobile ()){
            //alert("Mobile device!");
            document.querySelector('#mouseCursor').setAttribute('material', 'visible: true');
            document.querySelector('#mouseCursor').setAttribute('cursor', 'rayOrigin: entity');
        }                                                                                   
     });

     scene.addEventListener('exit-vr', function () {

        console.log("exited vr");
        document.querySelector('#head').object3D.position.set(0, 1.6, 0);
        document.querySelector('#mouseCursor').setAttribute('material', 'visible: false');
        document.querySelector('#mouseCursor').setAttribute('cursor', 'rayOrigin: mouse');
                                                                                        
     });

}

});



AFRAME.registerComponent('tower', {
    schema: {
        stack: {
            type: 'array',
            default: []
        },
        number: {
            type: 'number'
        },
        isStartingTower:{
            type: 'boolean',
            default: false
        }
    },

    init: function () {
        var el = this.el;
        var data = this.data;
        this.active = false;
        this.waiting = false;


        this.el.addEventListener("raycaster-intersected", evt => {
            this.raycaster = evt.detail.el;
          });
        this.el.addEventListener("raycaster-intersected-cleared", evt => {
            this.raycaster = null;
          });
        this.el.addEventListener("mouseenter", evt => {
            
            var pos = el.object3D.position;
            var helper = document.querySelector('[helper]').components.helper.data.stack;
            helper.forEach(element => {

                element.object3D.position.set(pos.x, pos.y + 0.35, pos.z);

            });
        });
        this.el.addEventListener("mouseleave", evt => {
        });

        //poczatkowe zebranie wszystkich ringow na lewej wiezy
        setTimeout(function () {
            var pos = el.getAttribute('position');

            if (pos.x < 0) {

                var rings = document.querySelector('a-scene').querySelectorAll('[ring]');

                var tempStack = new Array(6);

                rings.forEach(element => {
                   
                    tempStack[rings.length - 1 - element.getAttribute('ring').size] = element;
                });

                data.stack = tempStack;
                data.isStartingTower = true;
            }

        }, 1000);

        el.addEventListener('raycaster-intersected', function () {

            var pos = el.object3D.position;
            var helper = document.querySelector('[helper]').components.helper.data.stack;
            helper.forEach(element => {

                element.object3D.position.set(pos.x, pos.y + 0.35, pos.z);

            });

        });

        el.addEventListener('mousedown', function(){
            
            var pos = el.object3D.position;
            var helper = document.querySelector('#helper').components.helper;


            if (helper.data.active && data.stack.length != 0) {
                helper.popRing(data.stack.pop());
            } 
            else if (!helper.data.active) {
                
                if (data.stack.length == 0) {
                    var height = 0.02 + data.stack.length * 0.08;
                    var ring = helper.pushRing();

                    data.stack.push(ring);
                    ring.object3D.position.set(pos.x, height, pos.z);
                    console.log(data.stack);
                    // if(!data.isStartingTower){
                    //     if(data.stack.length == 2){
                    //         console.log("WYGRAŁEŚ!!!!")
                    //         document.querySelector('#particle').object3D.position.set(pos.x, 1.4, -1.6);
                    //         document.querySelector('#particle').setAttribute('particle-system', {color: "#EF0000, #44CC00", 
                    //         velocityValue: "0 15 0", 
                    //         size: 0.2,
                    //         accelerationValue: "0 -30 0",
                    //         positionSpread: "0.1 0.1 0.1",
                    //         particleCount: 500 });

                    //     }
                    // }
                } 
                
                else if (helper.data.stack[helper.data.stack.length - 1].components.ring.data.size < data.stack[data.stack.length - 1].components.ring.data.size) {
                    var height = 0.02 + data.stack.length * 0.08;
                    var ring = helper.pushRing();

                    data.stack.push(ring);
                    ring.object3D.position.set(pos.x, height, pos.z);
                    console.log(data.stack);
                    if(!data.isStartingTower){
                        if(data.stack.length == 3){
                            console.log("WYGRAŁEŚ!!!!")
                            document.querySelector('#particle').object3D.position.set(pos.x, 0, -15);
                            document.querySelector('#particle').setAttribute('particle-system', {color: "#EF0000, #44CC00", 
                            velocityValue: "0 25 0", 
                            velocitySpread: "10 7.5 10",
                            size: 1,
                            accelerationSpread: "10 0 10",
                            accelerationValue: "0 -10 0",
                            positionSpread: "0.1 0.1 0.1",
                            particleCount: 1000,
                            dragValue: 0.2,
                            maxAge: 6,
                            blending: 2 });

                        }
                    }
                }
            }
        });
    },
});

AFRAME.registerComponent('ring', {
    schema: {
        size: {
            type: 'number',
            default: 0
        },
        isOnTop: {
            type: 'boolean',
            default: false
        }
    }
});

AFRAME.registerComponent('helper', {
    schema: {
        stack: {
            type: 'array',
            default: []
        },
        active: {
            type: 'boolean',
            default: true
        }
    },

    init: function () {
        var el = this.el;

        this.data.stack.push(el);
    },

    popRing: function (ring) {

        var el = this.el;
        var data = this.data;
        var pos = el.getAttribute('position');

        data.stack.push(ring);
        data.active = false;

        ring.object3D.position.set(pos.x, pos.y, pos.z);
    },

    pushRing: function () {

        var el = this.el;
        var data = this.data;
        var pos = el.getAttribute('position');

        data.active = true;
        return data.stack.pop();
    }
});
