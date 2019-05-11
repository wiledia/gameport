'use strict';
// Class definition

var DefaultDatatableDemo = function() {
	// Private functions

	// basic demo
	var demo = function() {

		var datatable = $('.bp_datatable').KDatatable({
			data: {
				type: 'remote',
				source: {
					read: {
						url: 'inc/api/datatables/demos/default.php',
					},
				},
				pageSize: 20,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
			},

			layout: {
				theme: 'default',
				class: '',
				scroll: true,
				height: 550,
				footer: false,
			},

			sortable: true,

			filterable: false,

			pagination: true,

			search: {
				input: $('#generalSearch'),
			},

			columns: [
				{
					field: 'employee_id',
					title: 'Employee ID',
					locked: {left: 'lg'},
				}, {
					field: 'name',
					title: 'Name',
					locked: {left: 'lg'},
					template: function(row) {
						return row.first_name + ' ' + row.last_name;
					},
				}, {
					field: 'email',
					width: 150,
					title: 'Email',
				}, {
					field: 'phone',
					title: 'Phone',
				}, {
					field: 'hire_date',
					title: 'Hire Date',
					type: 'date',
					format: 'MM/DD/YYYY',
				}, {
					field: 'gender',
					title: 'Gender',
				}, {
					field: 'department',
					title: 'Department',
				}, {
					field: 'address',
					title: 'Address',
				}, {
					field: 'website',
					title: 'Website',
				}, {
					field: 'salary',
					title: 'Salary',
				}, {
					field: 'notes',
					title: 'Notes',
					width: 300,
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
						return '<span class="bp-badge bp-badge--' + status[row.type].state + ' bp-badge--dot"></span>&nbsp;<span class="bp-font-bold bp-font-' + status[row.type].state +
							'">' +
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

		$('#bp_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'status');
		});

		$('#bp_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'type');
		});

		$('#bp_form_status,#bp_form_type').selectpicker();

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