"use strict";
// Class definition

var DefaultDatatableDemo = function() {
	// Private functions

	// basic demo
	var demo = function() {

		var options = {
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'inc/api/datatables/demos/default.php',
					},
				},
				pageSize: 20, // display 20 records per page
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			// layout definition
			layout: {
				theme: 'default', // datatable theme
				class: '', // custom wrapper class
				scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
				height: 550, // datatable's body's fixed height
				footer: false, // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

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

		};

		var datatable = $('.bp_datatable').KDatatable(options);

		// both methods are supported
		// datatable.methodName(args); or $(datatable).KDatatable(methodName, args);

		$('#bp_datatable_destroy').on('click', function() {
			// datatable.destroy();
			$('.bp_datatable').KDatatable('destroy');
		});

		$('#bp_datatable_init').on('click', function() {
			datatable = $('.bp_datatable').KDatatable(options);
		});

		$('#bp_datatable_reload').on('click', function() {
			// datatable.reload();
			$('.bp_datatable').KDatatable('reload');
		});

		$('#bp_datatable_sort_asc').on('click', function() {
			datatable.sort('name', 'asc');
		});

		$('#bp_datatable_sort_desc').on('click', function() {
			datatable.sort('name', 'desc');
		});

		// get checked record and get value by column name
		$('#bp_datatable_get').on('click', function() {
			// select active rows
			datatable.rows('.bp-datatable__row--active');
			// check selected nodes
			if (datatable.nodes().length > 0) {
				// get column by field name and get the column nodes
				var value = datatable.columns('name').nodes().text();
				$('#datatable_value').html(value);
			}
		});

		// record selection
		$('#bp_datatable_check').on('click', function() {
			var input = $('#bp_datatable_check_input').val();
			datatable.setActive(input);
		});

		$('#bp_datatable_check_all').on('click', function() {
			// datatable.setActiveAll(true);
			$('.bp_datatable').KDatatable('setActiveAll', true);
		});

		$('#bp_datatable_uncheck_all').on('click', function() {
			// datatable.setActiveAll(false);
			$('.bp_datatable').KDatatable('setActiveAll', false);
		});

		$('#bp_datatable_hide_column').on('click', function() {
			datatable.columns('email').visible(false);
		});

		$('#bp_datatable_show_column').on('click', function() {
			datatable.columns('email').visible(true);
		});

		$('#bp_datatable_remove_row').on('click', function() {
			datatable.rows('.bp-datatable__row--active').remove();
		});
	};

	return {
		// public functions
		init: function() {
			demo();
		},
	};
}();

jQuery(document).ready(function() {
	DefaultDatatableDemo.init();
});