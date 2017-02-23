(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.ImageField = Alpaca.ControlField.extend(
    {
        getFieldType: function() {
            return "image";
        },

        getTitle: function() {
            return "Image Field";
        },

        getDescription: function() {
            return "Image Field.";
        }
    });

    Alpaca.registerFieldClass("image", Alpaca.Fields.ImageField);

})(jQuery);
