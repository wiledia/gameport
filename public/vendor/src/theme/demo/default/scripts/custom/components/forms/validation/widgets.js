"use strict";
// Class definition

var KFormWidgets = function () {
    // Private functions
    var validator;

    var initWidgets = function() {
        // datepicker
        $('#bp_datepicker').datepicker({
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });

        // datetimepicker
        $('#bp_datetimepicker').datetimepicker({
            pickerPosition: 'bottom-left',
            todayHighlight: true,
            autoclose: true,
            format: 'yyyy.mm.dd hh:ii'
        });

        $('#bp_datetimepicker').change(function() {
            validator.element($(this));
        });

        // timepicker
        $('#bp_timepicker').timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: true
        });

        // daterangepicker
        $('#bp_daterangepicker').daterangepicker({
            buttonClasses: 'bp-btn btn',
            applyClass: 'btn-primary',
            cancelClass: 'btn-secondary'
        }, function(start, end, label) {
            var input = $('#bp_daterangepicker').find('.form-control');
            
            input.val( start.format('YYYY/MM/DD') + ' / ' + end.format('YYYY/MM/DD'));
            validator.element(input); // validate element
        });

        // bootstrap select
        $('#bp_bootstrap_select').selectpicker();
        $('#bp_bootstrap_select').on('changed.bs.select', function() {
            validator.element($(this)); // validate element
        });

        // typeahead
        var countries = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'inc/api/typeahead/countries.json'
        });

        $('#bp_typeahead').typeahead(null, {
            name: 'countries',
            source: countries
        });
        $('#bp_typeahead').bind('typeahead:select', function(ev, suggestion) {
            validator.element($('#bp_typeahead')); // validate element
        });
    }
    
    var initValidation = function () {
        validator = $( "#bp_form_1" ).validate({
            // define validation rules
            rules: {
                date: {
                    required: true,
                    date: true 
                },
                daterange: {
                    required: true
                },
                datetime: {
                    required: true
                },
                time: {
                    required: true
                },
                select: {
                    required: true,
                    minlength: 2,
                    maxlength: 4
                },
                typeahead: {
                    required: true
                },
                markdown: {
                    required: true
                }
            },
            
            //display error alert on form submit  
            invalidHandler: function(event, validator) {             
                var alert = $('#bp_form_1_msg');
                alert.parent().removeClass('bp-hide');
                BPutil.scrollTo("bp_form_2", -200);
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
            }
        });       
    }

    return {
        // public functions
        init: function() {
            initWidgets(); 
            initValidation();
        }
    };
}();

jQuery(document).ready(function() {    
    KFormWidgets.init();
});