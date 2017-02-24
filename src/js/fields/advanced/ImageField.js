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
            return {
                "properties": {
                    "image": {}
                },
            };
        },

        getOptionsForSchema: function() {
            return {
                "fields": {
                    "image": {
                        "type": "file",
                    },
                }
            };
        },

        getSchemaOfOptions: function() {
            return {
                "type": "object",
                "properties": {}
            };
        },

        getOptionsForOptions: function() {
            return {
                "type": "object",
                "fields": {
                    "validate": {
                        "rightLabel": "Enforce validation",
                        "type": "checkbox"
                    },
                }
            };
        }
    });

    Alpaca.registerFieldClass("image", Alpaca.Fields.ImageField);

})(jQuery);
