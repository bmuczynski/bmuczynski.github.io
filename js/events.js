AFRAME.registerComponent('tower', {


    events: {

    },

    init: function() {
        var el = this.el;
        var tester = document.querySelector('#tester').components.tester;
        //el.addEventListener('click', function(){
        //tester.testFunction(el);


        //el.object3D.position.set(0, 1, -1);

        //});

    },

    update: function() {

    },

    testFunction: function() {

        //var tester = document.querySelector('#tester');

        console.log("Wywolano mnie");
        //console.log(tester.components.tester);
    }
})

AFRAME.registerComponent('tester', {
    testFunction: function(element) {

        element.object3D.position.set(0, 1, -1);

        //var tester = document.querySelector('#tester');

        console.log("Wywolano mnie");
        //console.log(tester.components.tester);
    }
})