//tooltip plugin
(function ( $ ) {

    $.fn.tooltip = function(action) {

        if(action == 'show') {
            var $root = this.closest('.cpli-content')

            if($root.find('.tooltip').length > 0)
                this.tooltip('hide')

            $root.append('<span class="tooltip">Dodato u korpu!</span>')

            var $tooltip = $root.find('.tooltip')

            $tooltip
            .css('width', this.css('width'))
            .fadeIn()

            setTimeout((function() { 
                $tooltip.fadeOut()
            }), 3000)

        }

        else if (action == 'hide') {
            this.closest('.cpli-content')
            .find('.tooltip')
            .fadeOut()
        }
        

        return this
    };
 
}( jQuery ))