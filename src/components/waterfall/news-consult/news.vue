<!--
 * @Author: sikonggpw 1327325804@qq.com
 * @Date: 2023-07-12 15:00:33
 * @LastEditors: wuxs 317009160@qq.com
 * @LastEditTime: 2023-09-08 17:38:42
 * @FilePath: \digital-portal\src\views\home\components\news-consult\news.vue
 * @Description: 工作台-新闻资讯-新闻
-->
<template>
	<!-- 视频展示 -->
	<div class="scrollreveal-news">
		<template v-if="data.contentType === 2">
			<div class="video">
				<div class="img orientation"></div>
				<div class="video-img">
					<img class="img" :src="src" alt="" />
					<img class="bg" :src="url + '/video-bg.png'" alt="" />
				</div>
				<span class="text text-ellipsis-2">
					{{ data.title }}
				</span>
				<span class="time">{{ Date.now() }}</span>
			</div>
		</template>

		<!-- 图文 -->
		<template v-if="isContent && data.coverImageUrl">
			<div class="news-img-top">
				<img class="img" :src="data.coverImageUrl" alt="" />
				<div class="text-info">
					<span class="text text-ellipsis-2">
						{{ data.title }}
					</span>
					<span class="time">{{ Date.now() }}</span>
				</div>
			</div>
		</template>
		<!-- 无图片 -->
		<template v-if="isContent && !data.coverImageUrl">
			<span class="text text-ellipsis-2" style="margin-bottom: 10px">
				{{ data.title }}
			</span>
			<span class="time">{{ Date.now() }}</span>
		</template>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';

const staticImg=''

const props = defineProps({
	data: {
		type: Object,
		default: () => ({}),
	},
});

// const text = '公司新闻';

onMounted(() => {
	// console.log(props.data.fileList);
	if (props.data.contentType === 2 && Array.isArray(props.data.fileList) && props.data.fileList.length > 0) {
		getVideoAddress(props.data.fileList[0].videoKey);
	}
});

const labelImg = computed(() => {
	return (type) => {
		return  staticImg + '/default-logo-min.png';
	};
});

const isContent = computed(() => {
	return props.data.contentType === 0 || props.data.contentType === 1;
});

const currentTime = (val) => {
	return dayjs(val).format('YYYY-MM-DD HH:mm');
};

// const videoInfo: Ref<videoInfoType> = ref({})
const coverAddress = ref(staticImg + '/default-logo.png');
// 获取视频地址
const getVideoAddress = async (videoKey) => {
	try {
		const res = await videoAddress(videoKey);
		if (res.coverAddress) {
			coverAddress.value = res.coverAddress;
		}
	} catch {
		//
	}
};
</script>
<style lang="scss" scoped>

@mixin TextStyle {
	font-size: 12px;
	font-family: PingFang SC-Regular, PingFang SC;
	font-weight: 400;
	color: #8590a6;
	line-height: 22px;
	display: inline-block;
}

.scrollreveal-news {
	width: 406px;
	height: 100%;
	padding: 18px;
	box-sizing: border-box;
	background: #ffffff;
	margin-bottom: 4px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	.label-img {
		width: 58px;
		height: 24px;
		margin-right: 4px;
		vertical-align: middle;
		transform: translateY(-2px);
	}

	.news-img-top {
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

			.time {
				min-width: 206px;
				min-height: 22px;
			}

			.text {
				min-width: 206px;
				min-height: 44px;
			}
		}
	}

	.img-info {
		@include TextStyle;
		min-width: 368px;
		min-height: 88px;
	}

	.video {
		height: 100%;
		// height: 286px;
		position: relative;

		.orientation {
			position: absolute;
			z-index: 2;
			width: 368px;
			height: 197px;
			background: #313131;
			opacity: 0.5;
		}

		.video-img {
			height: 197px;
			position: relative;

			:deep(#video-container) {
				width: 370px !important;
			}

			.img {
				width: 370px;
				height: 100%;
				background-color: #8590a6;
				object-fit: cover;
			}

			.bg {
				position: absolute;
				z-index: 3;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 82px;
				height: 82px;
				cursor: pointer;
			}
		}

		.text {
			width: 370px;
			min-height: 24px;
			margin: 10px 0;
			line-height: 24px;
		}

		.time {
			// min-width: 105px;
			height: 16px;
		}
	}

	&:hover {
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
		background: #e8f3ff;
		border-radius: 4px 4px 4px 4px;
		padding: 0 4px;

		font-size: 14px;
		font-family: YOUSHEhaoshenti-Regular, YOUSHEhaoshenti;
		font-weight: 400;
		color: #165dff;
	}
}

.time {
	@include TextStyle;
}
</style>
