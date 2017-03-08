(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.FileField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.FileField.prototype
     */
    {
        handleValidate: function() {
            var valInfo = this.validation;
            var status = this._validateDisallowTypes();
            valInfo["disallowTypes"] = {
                "message": status.result
                ?""
                :Alpaca.substituteTokens(
                    this.getMessage("disallowTypes")
                    , [status.ext]
                ),
                "status": status.result
            };
            return this.base() && valInfo["disallowTypes"]["status"];
        },

        _validateDisallowTypes: function() {
            var _return = {
                result: true,
                ext: false
            };
            var files = $(this.control)[0].files;
            var value = files.length;
            if (!value) {
              return _return;
            }
            var ext = getFileExtension(files[0].name);
            var invalid_extensions = 'exe|bat|sql';   
            if(ext.match(invalid_extensions))
            { 
                return {
                    result: false,
                    ext: ext
                };
            }
            return _return;
        },

        _validateOptional: function() {
            var value = $(this.control)[0].files.length;
            if (this.isRequired() && !value) {
                return false;
            }
            return true;
        },
        /**
         * @see Alpaca.ControlField#getFieldType
         */
        getFieldType: function()
        {
            return "file";
        },

        /**
         * @see Alpaca.Fields.TextField#setValue
         */
        setValue: function(value)
        {
            this.data = value;

            this.data = value;

            this.updateObservable();

            this.triggerUpdate();
        },

        /**
         * @see Alpaca.Fields.ControlField#getControlValue
         */
        getControlValue: function()
        {
            return this.data;
        },

        onChange: function(e)
        {
            this.base(e);

            if (this.options.selectionHandler)
            {
                this.processSelectionHandler(e.target.files);
            }
            this.control.blur();
        },

        processSelectionHandler: function(files)
        {
            if (files && files.length > 0)
            {
                // if the browser supports HTML5 FileReader, we can pull in the stream for preview
                if (typeof(FileReader) !== "undefined")
                {
                    // clear out previous loaded data
                    var loadedData = [];
                    var loadCount = 0;

                    var fileReader = new FileReader();
                    fileReader.onload = (function() {
                        var field = this;
                        return function(event)
                        {
                            var dataUri = event.target.result;

                            loadedData.push(dataUri);
                            loadCount++;

                            if (loadCount === files.length)
                            {
                                field.options.selectionHandler.call(field, files, loadedData);
                            }
                        };
                    }).call(this);

                    for (var i = 0; i < files.length; i++)
                    {
                        fileReader.readAsDataURL(files[i]);
                    }
                }
            }
        }

        /* builder_helpers */
        ,

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "File Field";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "Field for uploading files.";
        },

        /**
         * @private
         * @see Alpaca.ControlField#getSchemaOfOptions
         */
        getSchemaOfOptions: function() {
            return Alpaca.merge(this.base(), {
                "properties": {
                    "selectionHandler": {
                        "title": "Selection Handler",
                        "description": "Function that should be called when files are selected.  Requires HTML5.",
                        "type": "boolean",
                        "default": false
                    }
                }
            });
        },

        /**
         * @private
         * @see Alpaca.ControlField#getOptionsForOptions
         */
        getOptionsForOptions: function() {
            return Alpaca.merge(this.base(), {
                "fields": {
                    "selectionHandler": {
                        "type": "checkbox"
                    }
                }
            });
        }

        /* end_builder_helpers */
    });

    Alpaca.registerFieldClass("file", Alpaca.Fields.FileField);
    Alpaca.registerMessages({
        "disallowTypes": "{0} is disallow type of file."
    });

})(jQuery);
