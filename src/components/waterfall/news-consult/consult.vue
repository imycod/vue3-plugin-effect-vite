<template>
	<div class="consult">
		<!-- 有图片 -->
		<template v-if="data.img">
			<div class="consult-img-top">
				<img v-skeleton-item class="img" :src="data.img" alt="" />
				<div class="text-info">
					<span v-skeleton-item class="text text-ellipsis-2">
						<span class="label">{{ text }}</span>
						{{ data.name }}
					</span>
					<span v-skeleton-item class="time">2023-06-29 17:00</span>
				</div>
			</div>
			<div v-skeleton-item class="img-info text-ellipsis-3">
				{{ data.info }}
			</div>
		</template>

		<!-- 无图片 -->
		<template v-else>
			<span v-skeleton-item class="text text-ellipsis-2">
				<span class="label">{{ text }}</span>
				{{ data.name }}
			</span>
			<span v-skeleton-item class="time">{{ data.time }}</span>
		</template>
	</div>
</template>
<script setup>
defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
});

const text = '行业资讯';
</script>
<style lang="scss" scoped>

.consult {
	width: 406px;
	padding: 18px;
	box-sizing: border-box;
	background: #ffffff;
	margin-bottom: 16px;

	.consult-img-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;

		.img {
			width: 148px;
			height: 104px;
			margin-right: 14px;
		}

		.text-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.text {
				min-width: 206px;
				min-height: 44px;
			}

			.time {
				min-width: 206px;
				min-height: 22px;
			}
		}
	}

	.img-info {
		@include TextStyle;
		min-width: 368px;
		min-height: 88px;
	}
}

.text {
	font-size: 16px;
	font-family: PingFang SC-Semibold, PingFang SC;
	font-weight: 600;
	color: #333333;
	line-height: 20px;

	.label {
		display: inline-block;
		text-align: center;
		width: 58px;
		height: 24px;
		line-height: 24px;
		background: #f5e8ff;
		border-radius: 4px 4px 4px 4px;
		padding: 0 4px;

		font-size: 14px;
		font-family: YOUSHEhaoshenti-Regular, YOUSHEhaoshenti;
		font-weight: 400;
		color: #722ed1;
	}
}

.time {
	@include TextStyle;
}
</style>
