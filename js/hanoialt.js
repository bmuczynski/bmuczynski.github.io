AFRAME.registerComponent('tower', {
    schema: {
        stack: {
            type: 'array',
            default: []
        },
        number: {
            type: 'number'
        }
    },

    init: function () {
        var el = this.el;
        var data = this.data;
        this.active = false;
        this.waiting = false;


        this.el.addEventListener("raycaster-intersected", evt => {
            this.raycaster = evt.detail.el;
            console.log("Raycaster wlazl");
          });
        this.el.addEventListener("raycaster-intersected-cleared", evt => {
            this.raycaster = null;
            console.log("Raycaster wylazl i nie wrocil");
          });
        this.el.addEventListener("mouseenter", evt => {
            
            console.log("Mysz weszla");
            var pos = el.object3D.position;
            var helper = document.querySelector('[helper]').components.helper.data.stack;
            helper.forEach(element => {

                element.object3D.position.set(pos.x, pos.y + 0.35, pos.z);

            });
        });
        this.el.addEventListener("mouseleave", evt => {
            console.log("Mysz wyszla");
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
            } else if (!helper.data.active) {
                if (data.stack.length == 0) {
                    var height = 0.02 + data.stack.length * 0.08;
                    var ring = helper.pushRing();

                    data.stack.push(ring);
                    ring.object3D.position.set(pos.x, height, pos.z);
                } else if (helper.data.stack[helper.data.stack.length - 1].components.ring.data.size < data.stack[data.stack.length - 1].components.ring.data.size) {
                    var height = 0.02 + data.stack.length * 0.08;
                    var ring = helper.pushRing();

                    data.stack.push(ring);
                    ring.object3D.position.set(pos.x, height, pos.z);
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
