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

    events: {
        click: function (evt) {

            var el = this.el;
            var pos = el.getAttribute('position');
            var helper = document.querySelector('#helper').components.helper;
            var data = this.data;

            // console.log("--------------click");
            // console.log(helper.data.stack[0].object3D.position.x);
            // console.log(helper.data.stack);
            // console.log(data.stack);
            
            console.log(helper.data.active);

            if(helper.data.active) helper.popRing(data.stack.pop());

        }
      },


    init: function () {
        var el = this.el;
        var data = this.data;
       
        //poczatkowe zebranie wszystkich ringow na lewej wiezy
        setTimeout(function() {
            var pos = el.getAttribute('position');

            if (pos.x < 0) 
            {
                console.log("Lewa wieża");
    
                var rings = document.querySelector('a-scene').querySelectorAll('[ring]');
                
                var tempStack = new Array(6);
                
                rings.forEach(element => {
                    console.log(element.getAttribute('ring').size);
                    tempStack[rings.length - 1 - element.getAttribute('ring').size] = element;
                });

                data.stack = tempStack; 
                console.log(data.stack);
 
            }

        }, 1000);

        

        //przemieszczanie kulki
        el.addEventListener('mouseenter', function() {

            var pos = el.object3D.position;
            var helper = document.querySelector('[helper]').components.helper.data.stack;
            // console.log(pos);
            // helper.object3D.position.set(pos.x, pos.y + 0.42, pos.z);
            // console.log(helper.object3D.position);
            // console.log(helper);
            console.log(helper);
            console.log(data.stack);
            helper.forEach(element => {

                element.object3D.position.set(pos.x, pos.y + 0.42, pos.z);
                
            });

        });


        el.addEventListener('click', function () {       

            // var pos = el.getAttribute('position');
            // var helper = document.querySelector('[helper]').components.helper;
            // var currentTower = el.getAttribute('tower');
            // var data = this.data;

            // if (pos.x > 0) {
            //     console.log("Prawa wieża");
            // } else if (pos.x == 0) {
            //     console.log("Środkowa wieża");
            // } else if (pos.x < 0) {
            //     console.log("Lewa wieża");
            // }
            // console.log("--------------click");
            // console.log(helper.data.stack[0].object3D.position.x);
            // console.log(helper.data.stack);
            // console.log(data.stack);

            //helper.popRing();

            //this.stack = tempStack;

            //console.log(tempStack[0]);
            //console.log(tempStack[0].getAttribute('ring').isOnTop);

        });

       


    },


    update: function(oldData){
        var data = this.data;
        var el = this.el;

        if (oldData.onClick !== data.onClick) {
			el.addEventListener('click', function () {
                el.setAttribute('tower', 'stack', data.onClick);
                console.log("updateted");
			});
        }
        
        console.log("entered udpate");

            
    }
});
/*update: function(){
    var el = this.el;
    var tempStack2 = [];

    el.addEventListener('click', function(){
        tempStack2 =  el.stack;
        console.log(el.stack);
        
        console.log(tempStack2[0].getAttribute('ring'));
    });


},

addRing: function(ring){
    var ringToAdd = ring 
    var sceneEl = document.querySelector('a-scene');
    var tempStack = sceneEl.querySelectorAll('ring');
    stack = tempStack;
}*/


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

        data.stack.push(ring);

        console.log(data.stack);

        // if (this.data.active) {
            
            
        //     //var ring = this.stack.pop();
            
            
        //     var towers = document.querySelectorAll('[tower]');

        //     towers.forEach(element => {
        //         element.setAttribute('event-set__ring', {
        //             _target: ring.getAttribute('id')
        //         });
        //         console.log(element.getAttribute('event-set__ring'));

        //     })

        //     //ring.setAttribute('position', el.object3D.position);

        //     this.data.active = false;
        //     console.log(ring);

       //}





    }
});

AFRAME.registerComponent('manager', {
    schema: {
        isRingActive: {
            type: "boolean",
            default: false
        }
    },

    init: function () {
        var el = this.el;
        var data = this.data;
        var rings = document.querySelectorAll('ring');
        var towers = document.querySelectorAll('tower');
        var helper = document.querySelector('helper');

    }


});


AFRAME.registerComponent('foo', {
    events: {
      click: function (evt) {
        console.log('This entity was clicked!');
        this.el.setAttribute('material', 'color', 'red');
      }
    }
  });