AFRAME.registerComponent('tower', {
    init: function() {
        var el = this.el;

        el.addEventListener('click', function () {
            
            var pos = el.getAttribute('position');
            
            if(pos.x>0){
                console.log("Prawa wieża");
            } 
            else if(pos.x == 0){
                console.log("Środkowa wieża");
            }
            else if(pos.x<0) {
                console.log("Lewa wieża");
            }
        });
    }
});