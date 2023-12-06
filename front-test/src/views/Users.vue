<script setup>
import { ref } from 'vue';

const businesses = ref(null);
const jobs = ref(null);
const locations = ref(null);
const classifications = ref(null);

const dataAPI = ref(null);

const fetchData = function () {
	Promise.all([
		fetch("http://localhost:3000/api/businesses"),
		fetch("http://localhost:3000/api/jobs"),
		fetch("http://localhost:3000/api/locations"),
		fetch("http://localhost:3000/api/classifications")
		// this is only for demo. For simplicity server could combine all endpoints => one object/request
	])
		.then(async ([resBusinesses, resJobs, resLocations, resClassifications]) => {
			businesses.value = await resBusinesses.json()
			jobs.value = await resJobs.json()
			locations.value = await resLocations.json()
			classifications.value = await resClassifications.json()

			// window.setTimeout(() => jobs///....... = [], 3000)
		})
}

fetchData()
</script>

<script>
import CustomSelect from "./../components/select/CustomSelect.vue";

export default {
	components: {
		CustomSelect,
	}
}	
</script> 

<template>
	<div class="card m-3">
		<h5 class="card-header text-center">Simple APP</h5>
		<div class="card-body">
			<div v-if="businesses">
				<h5>Please select username:</h5>
				<CustomSelect :jobsData="jobs" :locationsData="locations" :classData="classifications" :options="businesses"
					placeholder="Select some" :default="'Select'" class="select" />
				<div>
				</div>
			</div>

			<div v-if="!businesses" class="text-center">
				<div class="spinner-border spinner-border-sm"></div>
			</div>

		</div>
	</div>
</template>

<style lang="scss">
*,
*::before,
*::after {
	box-sizing: border-box;
}

#app {
	margin: 0 auto;
	line-height: 1.4;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

h1 {
	text-align: center;
}
</style>
