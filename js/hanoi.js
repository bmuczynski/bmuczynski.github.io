AFRAME.registerComponent('tower', {
    schema: {
        stack: {type: 'array', default: []}
    },
    
    init: function() {
        var el = this.el;

        el.addEventListener('click', function () {
            
            var pos = el.getAttribute('position');
            var helper = document.querySelector('a-scene').querySelectorAll('[helper]');

            if(pos.x>0){
                console.log("Prawa wieża");
            } 
            else if(pos.x == 0){
                console.log("Środkowa wieża");
            }
            else if(pos.x<0) {
                console.log("Lewa wieża");
            }


            //this.stack = tempStack;
            
            //console.log(tempStack[0]);
            //console.log(tempStack[0].getAttribute('ring').isOnTop);

        });


    },

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

});

AFRAME.registerComponent('ring', {
    schema: {
        size: {type: 'number', default: 0},
        isOnTop: {type: 'boolean', default: false}

    },


    init: function(){
        var el = this.el;

    },

    popRing: function(pos){
        var helper = document.querySelectorAll('[helper]')[0];
        var newPosition = helper.position;
        var el = this.el;

        console.log(helper);
        console.log(newPosition)

        el.setAttribute('position', newPosition);
    }



});

AFRAME.registerComponent('helper',{

    init: function(){
        var el = this.el;

        var rings = document.querySelector('a-scene').querySelectorAll('[ring]');
        console.log(rings);
        var tempStack = new Array(rings.length);

        rings.forEach(element => {
            
            if(element.getAttribute('ring').size == 0) {
                console.log(element.getAttribute('ring'));
                console.log("Weszlo");   
                element.setAttribute('ring', {isOnTop: true});
                console.log(element.getAttribute('ring'));
                //element.flushToDOM(); //aktualizuje wartości w htmlu
            }
            console.log(element.getAttribute('ring').size + " dodano do wiezy");
            tempStack[rings.length - 1 - element.getAttribute('ring').size] = element;
            console.log(tempStack);  
            
        });


    }
})

AFRAME.registerComponent('manager',{
    schema: {
        isRingActive: {type: "boolean", default: false}
    },

    init: function(){
        var el = this.el;
        var data = this.data;
        var rings = document.querySelectorAll('ring');
        var towers = document.querySelectorAll('tower');
        var helper = document.querySelector('helper');

    }
    

})