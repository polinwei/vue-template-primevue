 <template>
<div class="p-grid p-fluid dashboard">
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Users</span>
			<span class="detail">Number of visitors</span>
			<span class="count visitors">12</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Sales</span>
			<span class="detail">Number of purchases</span>
			<span class="count purchases">534</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Revenue</span>
			<span class="detail">Income for today</span>
			<span class="count revenue">$3,200</span>
		</div>
	</div>

<div class="p-col-12 p-lg-6">
		<div class="card">
			<h1 style="font-size:16px">Recent Sales</h1>
			<DataTable :value="dataTableCars" class="p-datatable-responsive p-datatable-striped" 
				:selection.sync="dataTableSelectedCar" selectionMode="single" dataKey="vin" 
				:paginator="true" :rows="5" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
				:rowsPerPageOptions="[5,10,50]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
				<Column field="vin" header="Vin" :sortable="true"></Column>
				<Column field="year" header="Year" :sortable="true"></Column>
				<Column field="brand" header="Brand" :sortable="true"></Column>
				<Column field="color" header="Color" :sortable="true"></Column>
				<Column headerStyle="width: 8em; text-align: center" bodyStyle="text-align: center">
						<template #body="slotProps">
								<span class="p-column-title">Color</span>
								{{slotProps.data.color}}
						</template>
						<template #header>
								<Button type="button" icon="pi pi-cog"></Button>
						</template>
						<template #body="">
								<Button type="button" icon="pi pi-search" class="p-button-success" style="margin-right: .5em"></Button>
								<Button type="button" icon="pi pi-pencil" class="p-button-warning"></Button>
						</template>
				</Column>
				<template #paginatorLeft>
						<Button type="button" icon="pi pi-refresh" class="p-button-text" />
				</template>
			</DataTable>
		</div>
	</div>

	<div class="p-col-12 p-lg-6 contacts">
		<Panel header="Contacts">
			<ul>
				<li>
					<button class="p-link">
						<img src="assets/layout/images/avatar_1.png" width="35" alt="avatar1"/>
						<span class="name">Claire Williams</span>
						<span class="email">clare@pf-sigma.com</span>
					</button>
				</li>
				<li>
					<button class="p-link">
						<img src="assets/layout/images/avatar_2.png" width="35" alt="avatar2"/>
						<span class="name">Jason Dourne</span>
						<span class="email">jason@pf-sigma.com</span>
					</button>
				</li>
				<li>
					<button class="p-link">
						<img src="assets/layout/images/avatar_3.png" width="35" alt="avatar3"/>
						<span class="name">Jane Davidson</span>
						<span class="email">jane@pf-sigma.com</span>
					</button>
				</li>
				<li>
					<button class="p-link">
						<img src="assets/layout/images/avatar_4.png" width="35" alt="avatar4"/>
						<span class="name">Tony Corleone</span>
						<span class="email">tony@pf-sigma.com</span>
					</button>
				</li>
			</ul>
		</Panel>
	</div>

	<div class="p-col-12 p-lg-12">
		<Panel header="Calendar" style="height: 100%">			
			<FullCalendar :events="events" :options="options" />
		</Panel>
	</div>


</div>
</template>

<script>
import CarService from '../services/CarService';
import EventService from '../services/EventService';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  data() {
		return {
			dataTableCars: null,
			dataTableSelectedCar: null,
			events: null,
			options: {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2019-01-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true
			},
		}
	},
	carService: null,
	eventService: null,	
	created() {
		this.carService = new CarService();
		this.eventService = new EventService();
	},
	mounted() {
		this.carService.getCarsSmall().then(data => this.dataTableCars = data);	
		this.eventService.getEvents().then(data => this.events = data);	
	}
	
}
</script>