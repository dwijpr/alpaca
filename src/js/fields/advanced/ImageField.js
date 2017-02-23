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
        },

        getSchemaOfSchema: function() {
            return {};
        },

        getOptionsForSchema: function() {
            return {};
        },

        getSchemaOfOptions: function() {
            return {};
        },

        getOptionsForOptions: function() {
            return {};
        }
    });

    Alpaca.registerFieldClass("image", Alpaca.Fields.ImageField);

})(jQuery);
