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


</div>
</template>

<script>
import CarService from '../services/CarService';

export default {
  data() {
		return {
			dataTableCars: null,
			dataTableSelectedCar: null,
		}
	},
	carService: null,	
	created() {
		this.carService = new CarService();
	},
	mounted() {
		this.carService.getCarsSmall().then(data => this.dataTableCars = data);		
	}
	
}
</script>