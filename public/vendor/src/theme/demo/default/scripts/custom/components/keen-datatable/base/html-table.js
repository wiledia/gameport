"use strict";
// Class definition

var DatatableHtmlTableDemo = function() {
	// Private functions

	// demo initializer
	var demo = function() {

		var datatable = $('.bp-datatable').KDatatable({
			data: {
				saveState: {cookie: false},
			},
			search: {
				input: $('#generalSearch'),
			},
			columns: [
				{
					field: 'DepositPaid',
					type: 'number',
				},
				{
					field: 'OrderDate',
					type: 'date',
					format: 'YYYY-MM-DD',
				}, {
					field: 'Status',
					title: 'Status',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'bp-badge--brand'},
							2: {'title': 'Delivered', 'class': ' bp-badge--metal'},
							3: {'title': 'Canceled', 'class': ' bp-badge--primary'},
							4: {'title': 'Success', 'class': ' bp-badge--success'},
							5: {'title': 'Info', 'class': ' bp-badge--info'},
							6: {'title': 'Danger', 'class': ' bp-badge--danger'},
							7: {'title': 'Warning', 'class': ' bp-badge--warning'},
						};
						return '<span class="bp-badge ' + status[row.Status].class + ' bp-badge--inline bp-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="bp-badge bp-badge--' + status[row.Type].state + ' bp-badge--dot"></span>&nbsp;<span class="bp-font-bold bp-font-' +status[row.Type].state + '">' +	status[row.Type].title + '</span>';
					},
				},
			],
		});

    $('#bp_form_status').on('change', function() {
      datatable.search($(this).val().toLowerCase(), 'status');
    });

    $('#bp_form_type').on('change', function() {
      datatable.search($(this).val().toLowerCase(), 'type');
    });

    $('#bp_form_status,#bp_form_type').selectpicker();

	};

	return {
		// Public functions
		init: function() {
			// init dmeo
			demo();
		},
	};
}();

jQuery(document).ready(function() {
	DatatableHtmlTableDemo.init();
});