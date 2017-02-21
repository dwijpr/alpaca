(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.SignatureField = Alpaca.ControlField.extend(
    {
        getFieldType: function() {
            return "signature";
        },

        getTitle: function() {
            return "Signature Field";
        },

        getDescription: function() {
            return "Signature Field.";
        },

        postRender: function(callback) {
            var self = this;
            this.base(function() {
                var wrapper = $(self.field[0]);
                var clearButton = wrapper.find("[data-action=clear]")[0],
                    saveButton = wrapper.find("[data-action=save]")[0],
                    canvas = wrapper.find("canvas")[0],
                    signaturePad;

                function resizeCanvas() {
                    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
                    canvas.width = canvas.offsetWidth * ratio;
                    canvas.height = canvas.offsetHeight * ratio;
                    canvas.getContext("2d").scale(ratio, ratio);
                }

                window.onresize = resizeCanvas;
                setTimeout(function() {
                    resizeCanvas();
                }, 200);

                self.signaturePad = signaturePad = new SignaturePad(canvas);

                clearButton.addEventListener("click", function (event) {
                    signaturePad.clear();
                });

                saveButton.addEventListener("click", function (event) {
                    if (signaturePad.isEmpty()) {
                        alert("Please provide signature first.");
                    } else {
                        console.log(signaturePad.toDataURL());
                    }
                });
            });
            callback();
        }
    });

    Alpaca.registerFieldClass("signature", Alpaca.Fields.SignatureField);

})(jQuery);
