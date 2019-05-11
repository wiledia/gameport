"use strict";
// Class definition

var DatatableRecordSelectionDemo = function() {
    // Private functions

    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: 'inc/api/datatables/demos/default.php',
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            theme: 'default', // datatable theme
            class: '', // custom wrapper class
            scroll: true, // enable/disable datatable scroll both horizontal and
            // vertical when needed.
            height: 350, // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        pagination: true,

        // columns definition

        columns: [{
            field: 'employee_id',
            title: '#',
            sortable: false,
            width: 20,
            selector: {
                class: 'bp-checkbox--solid bp-checkbox--brand'
            },
            textAlign: 'center',
        }, {
            field: 'id',
            title: 'Employee ID',
            template: '{{employee_id}}',
        }, {
            field: 'name',
            title: 'Name',
            template: function(row) {
                return row.first_name + ' ' + row.last_name;
            },
        }, {
            field: 'phone',
            title: 'Phone',
        }, {
            field: 'hire_date',
            title: 'Hire Date',
            type: 'date',
            format: 'MM/DD/YYYY',
        }, {
            field: 'status',
            title: 'Status',
            // callback function support for column rendering
            template: function(row) {
                var status = {
                    1: {
                        'title': 'Pending',
                        'class': 'bp-badge--brand'
                    },
                    2: {
                        'title': 'Delivered',
                        'class': ' bp-badge--metal'
                    },
                    3: {
                        'title': 'Canceled',
                        'class': ' bp-badge--primary'
                    },
                    4: {
                        'title': 'Success',
                        'class': ' bp-badge--success'
                    },
                    5: {
                        'title': 'Info',
                        'class': ' bp-badge--info'
                    },
                    6: {
                        'title': 'Danger',
                        'class': ' bp-badge--danger'
                    },
                    7: {
                        'title': 'Warning',
                        'class': ' bp-badge--warning'
                    },
                };
                return '<span class="bp-badge ' + status[row.status].class +
                    ' bp-badge--inline bp-badge--pill">' + status[row.status].title +
                    '</span>';
            },
        }, {
            field: 'type',
            title: 'Type',
	        autoHide: false,
            // callback function support for column rendering
            template: function(row) {
                var status = {
                    1: {
                        'title': 'Online',
                        'state': 'danger'
                    },
                    2: {
                        'title': 'Retail',
                        'state': 'primary'
                    },
                    3: {
                        'title': 'Direct',
                        'state': 'accent'
                    },
                };
                return '<span class="bp-badge bp-badge--' + status[row.type].state +
                    ' bp-badge--dot"></span>&nbsp;<span class="bp-font-bold bp-font-' +
                    status[row.type].state + '">' + status[row.type].title + '</span>';
            },
        }, {
            field: 'Actions',
            title: 'Actions',
            sortable: false,
            width: 100,
            overflow: 'visible',
            textAlign: 'left',
	        autoHide: false,
            template: function() {
	            return '\
                    <div class="dropdown">\
                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" data-toggle="dropdown">\
                            <i class="flaticon2-settings"></i>\
                        </a>\
                        <div class="dropdown-menu dropdown-menu-right">\
                            <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                            <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                            <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                        </div>\
                    </div>\
                    <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit details">\
                        <i class="flaticon2-file"></i>\
                    </a>\
                    <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Delete">\
                        <i class="flaticon2-delete"></i>\
                    </a>\
                ';
            },
        }],
    };

    // basic demo
    var localSelectorDemo = function() {

        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#local_record_selection').KDatatable(options);

        $('#bp_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#bp_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'type');
        });

        $('#bp_form_status,#bp_form_type').selectpicker();

        datatable.on(
            'bp-datatable--on-check bp-datatable--on-uncheck bp-datatable--on-layout-updated',
            function(e) {
                var checkedNodes = datatable.rows('.bp-datatable__row--active').nodes();
                var count = checkedNodes.length;
                $('#bp_datatable_selected_number').html(count);
                if (count > 0) {
                    $('#bp_datatable_group_action_form').collapse('show');
                } else {
                    $('#bp_datatable_group_action_form').collapse('hide');
                }
            });

        $('#bp_modal_fetch_id').on('show.bs.modal', function(e) {
            var ids = datatable.rows('.bp-datatable__row--active').
            nodes().
            find('.bp-checkbox--single > [type="checkbox"]').
            map(function(i, chk) {
                return $(chk).val();
            });
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $(e.target).find('.bp_datatable_selected_ids').append(c);
        }).on('hide.bs.modal', function(e) {
            $(e.target).find('.bp_datatable_selected_ids').empty();
        });

    };

    var serverSelectorDemo = function() {

        // enable extension
        options.extensions = {
            checkbox: {},
        };
        options.search = {
            input: $('#generalSearch1'),
        };

        var datatable = $('#server_record_selection').KDatatable(options);

        $('#bp_form_status1').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#bp_form_type1').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'type');
        });

        $('#bp_form_status1,#bp_form_type1').selectpicker();

        datatable.on(
            'bp-datatable--on-click-checkbox bp-datatable--on-layout-updated',
            function(e) {
                // datatable.checkbox() access to extension methods
                var ids = datatable.checkbox().getSelectedId();
                var count = ids.length;
                $('#bp_datatable_selected_number1').html(count);
                if (count > 0) {
                    $('#bp_datatable_group_action_form1').collapse('show');
                } else {
                    $('#bp_datatable_group_action_form1').collapse('hide');
                }
            });

        $('#bp_modal_fetch_id_server').on('show.bs.modal', function(e) {
            var ids = datatable.checkbox().getSelectedId();
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $(e.target).find('.bp_datatable_selected_ids').append(c);
        }).on('hide.bs.modal', function(e) {
            $(e.target).find('.bp_datatable_selected_ids').empty();
        });

    };

    return {
        // public functions
        init: function() {
            localSelectorDemo();
            serverSelectorDemo();
        },
    };
}();

jQuery(document).ready(function() {
    DatatableRecordSelectionDemo.init();
});