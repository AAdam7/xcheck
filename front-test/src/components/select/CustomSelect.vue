<template>
	<div>
		<div class="custom-select" :tabindex="tabindex" @blur="open = false">
			<div class="selected" :class="{ open: open }" @click="open = !open">
				{{ selected }}
			</div>
			<div class="items" :class="{ selectHide: !open }">
				<div v-for="items in options" :key="items.id" @click="
					selected = items.display_name;
				selectedJobs = jobsData
				selectedClass = items.classifications;
				selectedLocations = items.locations_served;
				open = false;
				$emit('input', items);
				">
					{{ items.display_name }}
				</div>
			</div>
		</div>
		<div v-if="selectedClass">
			<p>CLASSIFICATION</p>
			{{ selectedClass }}
			<ul class="mb-0">
				<li v-for="(items, index) in selectedClass" :classData="classData" :key="index - 1">{{ classData[items - 1]
				}}
				</li>
			</ul>
		</div>
		<div v-if="selectedClass">
			<div v-if="selectedClass.length < 2">
				<p>JOBS</p>
				<ul class="mb-0" v-for="(items, index) in selectedJobs" :locationsData="locationsData" :key="index - 1">
					<li
						v-if="selectedJobs[index].classification == selectedClass && selectedJobs[index].location == selectedLocations">
						<p>{{ index + 1 }} {{ items }}</p>
					</li>
				</ul>
			</div>
			<div v-else>
				<p>JOBS[more]</p>
				<ul class="mb-0" v-for="(items, parent_index) in selectedJobs" :locationsData="locationsData" :key="parent_index">
					<div v-for="(nextItems, index) in selectedJobs" :key="index">
						<li v-if="selectedJobs[index].classification == selectedClass[parent_index]">
							<p>{{ new Date(nextItems.date_added).toLocaleDateString() }} {{ new
								Date(nextItems.date_added).toLocaleTimeString() }}</p>
							<p>{{ index + 1 + ':' }} {{ nextItems.headline }}</p>
						</li>
					</div>
				</ul>
			</div>
		</div>
		<div v-if="selectedLocations">
			<p>LOCATION</p>
			{{ selectedLocations }}
			<ul class="mb-0">
				<li v-for="items in selectedLocations" :locationsData="locationsData" :key="locationsData[items]">
					{{ locationsData[items - 1] }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		jobsData: {
			type: Array,
			required: false,
		},
		classData: {
			type: Array,
			required: false,
		},
		locationsData: {
			type: Array,
			required: false,
		},
		options: {
			type: Array,
			required: true,
		},
		default: {
			type: String,
			required: false,
			default: null,
		},
		tabindex: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	data() {
		return {
			selectedJobs: this.id,
			selectedClass: this.id,
			selectedLocations: this.id,
			selected: this.default
				? this.default
				: this.options.length > 0
					? this.options[0]
					: null,
			open: false,
		};
	},
	methods: {
		updateSelected(newValue) {
			console.log(newValue)
			this.$emit("job", this.selectedJobs);
			this.$emit("classifications", this.selectedClass);
			this.$emit("locations", this.selectedLocations);
		},
	},
	mounted() {


		this.$emit("input", this.selected);
	}
};
</script>

<style scoped>
.custom-select {
	position: relative;
	width: 100%;
	text-align: left;
	outline: none;
	height: 47px;
	line-height: 47px;
}

.custom-select .selected {
	background-color: #0a0a0a;
	border-radius: 6px;
	border: 1px solid #666666;
	color: #fff;
	padding-left: 1em;
	cursor: pointer;
	user-select: none;
}

.custom-select .selected.open {
	border: 1px solid #ad8225;
	border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
	position: absolute;
	content: "";
	top: 22px;
	right: 1em;
	width: 0;
	height: 0;
	border: 5px solid transparent;
	border-color: #fff transparent transparent transparent;
}

.custom-select .items {
	color: #fff;
	border-radius: 0px 0px 6px 6px;
	overflow: hidden;
	border-right: 1px solid #ad8225;
	border-left: 1px solid #ad8225;
	border-bottom: 1px solid #ad8225;
	position: absolute;
	background-color: #0a0a0a;
	left: 0;
	right: 0;
	z-index: 1;
}

.custom-select .items div {
	color: #fff;
	padding-left: 1em;
	cursor: pointer;
	user-select: none;
}

.custom-select .items div:hover {
	background-color: #ad8225;
}

.selectHide {
	display: none;
}
</style>
