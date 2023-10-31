<template>
	{{ loading }}
	<div>
		<div v-if="loading" class="content">
			<div class="waterfall-box" id="waterfall-layout">
				<Waterfall :list="contentArr" :breakpoints="breakpoints">
					<template #item="{ item }">
						<div class="scrollreveal-news">
							<NewsVue :data="item" @click="newsClick(item)"></NewsVue>
						</div>
					</template>
				</Waterfall>
			</div>
			<div class="more">
				<span @click="addData">加载更多</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, getCurrentInstance, ref, Ref } from 'vue';
import NewsVue from './news-consult/news.vue';
import { Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import ScrollReveal from 'scrollreveal';
import { watch } from 'vue';

const { proxy } = getCurrentInstance() as any;
const tableArr = [
	{
		label: '全部',
		name: 'all',
	},
	{
		label: '公司新闻',
		name: 'company',
	},
	{
		label: '行业资讯',
		name: 'industry',
	},
];
const breakpoints = {
	1200: {
		// 当屏幕宽度小于等于1200
		rowPerView: 2,
	},
	800: {
		// 当屏幕宽度小于等于800
		rowPerView: 2,
	},
	500: {
		// 当屏幕宽度小于等于500
		rowPerView: 2,
	},
};

// 定义的数据结构，后期根据接口返回的数据结构进行修改

const contentArr = ref([]);
const total = ref(0);
const currentTab = ref(tableArr[0]);
const toggleTab = (e) => {
	query.current = 1;
	currentTab.value = e;
	getList(e);
};
let query = {
	businessTypeList: '',
	contentCategoryList: [],
	publishTime: proxy.currentDateStr,
	size: 30,
	current: 1,
	status: 0,
	showFlag: 0,
};
const isMore = computed(() => {
	return total.value > contentArr.value.length;
});

const loading = ref(false);
const scrollRef = ref(null);

const getList = (isFirst = false) => {
	new Promise((r, j) => {
		if (isFirst) {
			contentArr.value = [
				{
					contentType: 1,
					coverImageUrl: 'image1.jpg',
					title: '美丽的风景',
				},
				{
					contentType: 2,
					src: 'video2.mp4',
					url: 'https://example.com/video2',
					title: '精彩的瞬间',
				},
				{
					contentType: 1,
					coverImageUrl: 'image2.jpg',
					title: '自然之美',
				},
				{
					contentType: 2,
					src: 'video3.mp4',
					url: 'https://example.com/video3',
					title: '冒险旅程',
				},
				{
					contentType: 1,
					coverImageUrl: 'image3.jpg',
					title: '城市夜景',
				},
			]
		} else {
			contentArr.value.push({
				contentType: 1,
				coverImageUrl: 'image1.jpg',
				title: '美丽的风景',
			})
		}
	}).finally(() => {
		loading.value = true
		if (isFirst) {
			scrollRef.value = ScrollReveal({
				origin: 'bottom',
				distance: '60px',
				duration: 1000,
				delay: 100,
				reset: true,
				container: '#waterfall-layout',
			});
		}
	}).catch((e) => {
		console.log(e);
	})
};




const addData = () => {
	getList()
	nextTick(() => {
		view()
	});
};

const moreClick = () => {
}

const newsClick = (item) => {

};

const view = () => {
	scrollRef.value && scrollRef.value.reveal('.scrollreveal-news', { duration: 1000, origin: 'bottom' });
};

onUnmounted(() => {
	scrollRef.value && scrollRef.value.destroy();
});


onMounted(() => {
	getList(true);
});
</script>
<style lang="scss" scoped>
.content {
	// column-count: 2;
	// column-gap: 24px;

	.skeleton {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		&>div {
			width: 406px;
			height: 152px;
			margin-bottom: 10px;
		}
	}

	.more {
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			font-size: 14px;
			font-family: Source Han Sans CN-Bold, Source Han Sans CN;
			font-weight: bold;
			color: rgba(22, 93, 255, 0.6);
			cursor: pointer;
		}
	}

	.waterfall-box {
		width: 869px;
		min-height: 100vh;
		transform: translate(-11px, -8px);

		// :deep(.waterfall-list) {
		// 	background-color: #f8f8f8;
		// }
	}
}

:deep(.card-top) {
	// transform: translateY(-8px);
	margin-top: -16px;
}
</style>
