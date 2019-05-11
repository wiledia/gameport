"use strict";
// Class definition

var DefaultDatatableDemo = function() {
	// Private functions

	// basic demo
	var demo = function() {

		var datatable = $('.bp_datatable').KDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'inc/api/datatables/demos/default.php',
					},
				},
				pageSize: 5, // display 20 records per page
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				theme: 'default', // datatable theme
				class: '', // custom wrapper class
				scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
				height: 'auto', // datatable's body's fixed height
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			// toolbar
			toolbar: {
				// toolbar placement can be at top or bottom or both top and bottom repeated
				placement: ['bottom'],

				// toolbar items
				items: {
					// pagination
					pagination: {
						// page size select
						pageSizeSelect: [5, 10, 20, 30, 50], // display dropdown to select pagination size. -1 is used for "ALl" option
					},
				},
			},

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'id',
					title: '#',
					sortable: 'asc',
					width: 30,
					type: 'number',
					selector: false,
					textAlign: 'center',
				}, {
					field: 'employee_id',
					title: 'Employee ID',
				}, {
					field: 'name',
					title: 'Name',
					template: function(row) {
						return row.first_name + ' ' + row.last_name;
					},
				}, {
					field: 'hire_date',
					title: 'Hire Date',
					type: 'date',
					format: 'MM/DD/YYYY',
				}, {
					field: 'gender',
					title: 'Gender',
				}, {
					field: 'status',
					title: 'Status',
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
						return '<span class="bp-badge ' + status[row.status].class + ' bp-badge--inline bp-badge--pill">' + status[row.status].title + '</span>';
					},
				}, {
					field: 'type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="bp-badge bp-badge--' + status[row.type].state + ' bp-badge--dot"></span>&nbsp;<span class="bp-font-bold bp-font-' + status[row.type].state + '">' +
							status[row.type].title + '</span>';
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
							<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
						    	<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
						  	</div>\
						</div>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
							<i class="la la-edit"></i>\
						</a>\
						<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
							<i class="la la-trash"></i>\
						</a>\
					';
					},
				}],

		});

		$('#bp_datatable_clear').on('click', function() {
			$('#bp_datatable_console').html('');
		});

		$('#bp_datatable_reload').on('click', function() {
			datatable.reload();
		});
	};

	var eventsCapture = function() {
		$('.bp_datatable').on('bp-datatable--on-init', function() {
			eventsWriter('Datatable init');
		}).on('bp-datatable--on-layout-updated', function() {
			eventsWriter('Layout render updated');
		}).on('bp-datatable--on-ajax-done', function() {
			eventsWriter('Ajax data successfully updated');
		}).on('bp-datatable--on-ajax-fail', function(e, jqXHR) {
			eventsWriter('Ajax error');
		}).on('bp-datatable--on-goto-page', function(e, args) {
			eventsWriter('Goto to pagination: ' + args.page);
		}).on('bp-datatable--on-update-perpage', function(e, args) {
			eventsWriter('Update page size: ' + args.perpage);
		}).on('bp-datatable--on-reloaded', function(e) {
			eventsWriter('Datatable reloaded');
		}).on('bp-datatable--on-check', function(e, args) {
			eventsWriter('Checkbox active: ' + args.toString());
		}).on('bp-datatable--on-uncheck', function(e, args) {
			eventsWriter('Checkbox inactive: ' + args.toString());
		}).on('bp-datatable--on-sort', function(e, args) {
			eventsWriter('Datatable sorted by ' + args.field + ' ' + args.sort);
		});
	};

	var eventsWriter = function(string) {
		var console = $('#bp_datatable_console').append(string + '\t\n');
		$(console).scrollTop(console[0].scrollHeight - $(console).height());
	};

	return {
		// public functions
		init: function() {
			demo();
			eventsCapture();
		},
	};
}();

jQuery(document).ready(function() {
	DefaultDatatableDemo.init();
});